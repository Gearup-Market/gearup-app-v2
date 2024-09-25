#![no_std]

mod events;
use events::EscrowEvent;
use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, symbol_short, token, Address, Env, Symbol
};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    EscrowNotActive = 11,
    EscrowNotFound = 12
}

#[derive(Clone)]
#[contracttype]
pub struct Escrow {
    pub amount: i128,
    pub token: Address,
    pub buyer: Address,
    pub seller: Address,
    pub status: EscrowStatus,
}

#[derive(Clone)]
#[contracttype]
pub enum EscrowStatus {
    Active,
    Completed,
    Refunded,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Escrow(u32), // Escrow struct mapping
}

pub const MARKETPLACE_CONTRACT: Symbol = symbol_short!("MAR_CA");

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    // Initialize escrow
    pub fn init(
        env: Env,
        admin: Address,
    ) -> Result<(), Error> {
        admin.require_auth();
        env.storage().instance().set(&MARKETPLACE_CONTRACT, &admin);
        EscrowEvent::Initialized.publish(&env);
        Ok(())
    }

    pub fn require_admin(env: Env) {
        let marketplace_address: Address = env
            .storage()
            .instance()
            .get(&MARKETPLACE_CONTRACT)
            .unwrap();
        marketplace_address.require_auth();
    }
    

    pub fn get_escrow(env: Env, listing_id: u32) -> Result<Escrow, Error> {
        let escrow: Option<Escrow> = env
            .storage()
            .instance()
            .get::<_, Escrow>(&DataKey::Escrow(listing_id));
        if escrow.is_some() {
            Ok(escrow.unwrap())
        } else {
            Err(Error::EscrowNotFound)
        }
    }

    // Get the current status of the escrow
    pub fn status(env: Env, listing_id: u32) -> Result<EscrowStatus, Error> {
        let escrow: Escrow = Self::get_escrow(env, listing_id)?;
        Ok(escrow.status)
    }

    // Start a new escrow process
    pub fn lock_funds(
        env: Env,
        listing_id: u32,
        seller: Address,
        buyer: Address,
        token: Address,
        amount: i128,
    ) -> Result<(), Error> {
        Self::require_admin(env.clone());
        let escrow: Escrow = Escrow {
            amount,
            token: token.clone(),
            seller: seller.clone(),
            buyer: buyer.clone(),
            status: EscrowStatus::Active,
        };
        env.storage().instance().set(&DataKey::Escrow(listing_id), &escrow);
        EscrowEvent::FundsLocked(listing_id, seller, buyer, token, amount).publish(&env);
        Ok(())
    }

    // Release funds to the seller
    pub fn release(env: Env, listing_id: u32) -> Result<(), Error> {
        let mut escrow: Escrow = Self::get_escrow(env.clone(), listing_id.clone())?;
        Self::require_admin(env.clone());

        assert!(
            matches!(escrow.status, EscrowStatus::Active),
            "Escrow is not active"
        );

        let token_client: token::TokenClient<'_> = token::Client::new(&env, &escrow.token);
        token_client.transfer(
            &env.current_contract_address(),
            &escrow.seller,
            &escrow.amount,
        );

        escrow.status = EscrowStatus::Completed;
        env.storage().instance().set(&DataKey::Escrow(listing_id), &escrow);

        EscrowEvent::FundsReleased(listing_id, escrow.seller, escrow.amount).publish(&env);

        Ok(())
    }

    // Refund the buyer
    pub fn refund(env: Env, listing_id: u32) -> Result<(), Error> {
        Self::require_admin(env.clone());
        let mut escrow: Escrow = Self::get_escrow(env.clone(), listing_id)?;

        assert!(
            matches!(escrow.status, EscrowStatus::Active),
            "Escrow is not active"
        );
        let token_client: token::TokenClient<'_> = token::Client::new(&env, &escrow.token);
        token_client.transfer(
            &env.current_contract_address(),
            &escrow.buyer,
            &escrow.amount,
        );

        escrow.status = EscrowStatus::Refunded;
        env.storage().instance().set(&DataKey::Escrow(listing_id), &escrow);

        EscrowEvent::Refunded(listing_id, escrow.buyer, escrow.amount).publish(&env);

        Ok(())
    }
}
