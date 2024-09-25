#![no_std]

mod types;
mod events;

use events::AgreementEvent;
use soroban_sdk::{contract, contractimpl, Address, Env, String, Symbol};
use types::AgreementType;

use crate::types::{Agreement, AgreementStatus, DataKey, Error, ADMIN, MARKETPLACE_CONTRACT};

pub fn require_marketplace_call(env: &Env) {
    let marketplace_address: Address = env.storage().instance().get(&MARKETPLACE_CONTRACT).unwrap();
    marketplace_address.require_auth();
}

#[contract]
pub struct RentalAgreementContract;

#[contractimpl]
impl RentalAgreementContract {
    pub fn initialize(
        env: Env,
        admin: Address,
        marketplace_contract_id: Address,
    ) -> Result<(), Error> {
        admin.require_auth();
        if env.storage().instance().has::<Symbol>(&ADMIN) {
            return Err(Error::AlreadyInitialized);
        }

        if marketplace_contract_id.clone().to_string().is_empty() {
            return Err(Error::MissingMarketplaceContractId);
        }
        env.storage().instance().set(&ADMIN, &admin);
        env.storage()
            .instance()
            .set(&MARKETPLACE_CONTRACT, &marketplace_contract_id);
        env.storage().instance().set(&ADMIN, &admin);

        AgreementEvent::Initialized.publish(&env);
        Ok(())
    }

    pub fn create_agreement(
        env: Env,
        listing_id: u32,
        renter_or_buyer: Address,
        owner: Address,
        duration: u64,
        price: i128,
        is_rental: bool,
        terms_url: String,
    ) -> Result<u32, Error> {
        require_marketplace_call(&env);

        let current_time: u64 = env.ledger().timestamp();
        let end_time: u64 = if is_rental {
            current_time + duration
        } else {
            0
        };

        let agreement_type = if is_rental {
            AgreementType::Lease
        } else {
            AgreementType::Permanent
        };

        let agreement: Agreement = Agreement {
            owner: owner.clone(),
            renter_or_buyer: renter_or_buyer.clone(),
            start_time: current_time,
            end_time,
            price,
            is_rental,
            terms_url,
            status: AgreementStatus::Created,
            agreement_type: agreement_type.clone(),
        };

        env.storage()
            .instance()
            .set(&DataKey::Agreement(listing_id), &agreement);

        AgreementEvent::Created(listing_id, owner, renter_or_buyer, agreement_type).publish(&env);

        Ok(listing_id)
    }

    pub fn get_agreement(env: Env, listing_id: u32) -> Result<Agreement, Error> {
        let agreement: Option<Agreement> = env
            .storage()
            .instance()
            .get::<_, Agreement>(&DataKey::Agreement(listing_id));
        if agreement.is_some() {
            Ok(agreement.unwrap())
        } else {
            Err(Error::AgreementNotFound)
        }
    }

    pub fn is_agreement_active(env: Env, listing_id: u32) -> Result<bool, Error> {
        let agreement: Agreement = Self::get_agreement(env.clone(), listing_id)?;
        let current_time = env.ledger().timestamp();
        let is_active =
            agreement.status == AgreementStatus::Active && current_time < agreement.end_time;

        Ok(is_active)
    }

    pub fn get_agreement_status(env: Env, listing_id: u32) -> Result<AgreementStatus, Error> {
        let agreement: Agreement = Self::get_agreement(env.clone(), listing_id)?;
        Ok(agreement.status)
    }

    pub fn owner_fulfilled(env: Env, listing_id: u32) -> Result<bool, Error> {
        require_marketplace_call(&env);
        let mut agreement: Agreement = Self::get_agreement(env.clone(), listing_id)?;

        if agreement.status != AgreementStatus::Created {
            return Err(Error::AgreementNotActive);
        }

        agreement.status = AgreementStatus::Active;
        env.storage()
            .instance()
            .set(&DataKey::Agreement(listing_id), &agreement);

        AgreementEvent::Fulfilled(listing_id, agreement.owner).publish(&env);

        Ok(true)
    }

    pub fn complete_agreement(
        env: Env,
        listing_id: u32,
        renter_or_buyer: Address,
    ) -> Result<bool, Error> {
        require_marketplace_call(&env);
        let mut agreement: Agreement = Self::get_agreement(env.clone(), listing_id)?;

        if agreement.renter_or_buyer != renter_or_buyer || agreement.owner != renter_or_buyer {
            return Err(Error::AgreementNotOwnedByCaller);
        }

        if agreement.status != AgreementStatus::Created
            || agreement.status != AgreementStatus::Active
        {
            return Err(Error::AgreementNotActive);
        }

        agreement.status = AgreementStatus::Completed;
        env.storage()
            .instance()
            .set(&DataKey::Agreement(listing_id), &agreement);

        AgreementEvent::Completed(listing_id, renter_or_buyer).publish(&env);

        Ok(true)
    }

    pub fn terminate_agreement(
        env: Env,
        listing_id: u32,
        terminator: Address,
    ) -> Result<bool, Error> {
        terminator.require_auth();

        let mut agreement: Agreement = Self::get_agreement(env.clone(), listing_id)?;
        if agreement.owner != terminator {
            return Err(Error::AgreementNotOwnedByCaller);
        }

        if agreement.status == AgreementStatus::Active {
            return Err(Error::AgreementIsAlreadyActive);
        }

        agreement.status = AgreementStatus::Terminated;
        env.storage()
            .instance()
            .set(&DataKey::Agreement(listing_id), &agreement);

        AgreementEvent::Terminated(listing_id, terminator).publish(&env);
        Ok(true)
    }
}
