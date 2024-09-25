#![no_std]

mod events;
mod types;

use crate::types::{
    DataKey, Error, Listing, ListingStatus, PurchaseType, ADMIN, ESCROW_CONTRACT, NFT_CONTRACT,
    RENTAL_AGREEMENT_CONTRACT,
};
use events::MarketplaceEvent;
use soroban_sdk::{
    auth::{ContractContext, InvokerContractAuthEntry, SubContractInvocation},
    contract, contractimpl, panic_with_error, token, vec, Address, Env, IntoVal, String,
    Symbol, Vec,
};

mod nft_contract_client {
    soroban_sdk::contractimport!(file = "../../target/wasm32-unknown-unknown/release/nft.wasm");
}

mod agreement_contract_client {
    soroban_sdk::contractimport!(
        file = "../../target/wasm32-unknown-unknown/release/agreement.wasm"
    );
}

mod escrow_contract_client {
    soroban_sdk::contractimport!(file = "../../target/wasm32-unknown-unknown/release/escrow.wasm");
}

#[contract]
pub struct MarketplaceContract;

fn get_listing_by_id(env: &Env, listing_id: u32) -> Listing {
    let listing = env
        .storage()
        .instance()
        .get::<_, Listing>(&DataKey::Listing(listing_id));

    if listing.is_none() {
        panic_with_error!(&env, Error::ListingNotFound);
    }
    listing.unwrap()
}

#[contractimpl]
impl MarketplaceContract {
    pub fn initialize(
        env: Env,
        admin: Address,
        nft_contract: Address,
        agreement_contract: Address,
        escrow_contract: Address,
    ) -> Result<(), Error> {
        admin.require_auth();
        if env.storage().instance().has::<Symbol>(&ADMIN) {
            return Err(Error::AlreadyInitialized);
        }
        if env.storage().instance().has::<Symbol>(&ADMIN) {
            return Err(Error::AlreadyInitialized);
        }
        env.storage().instance().set(&ADMIN, &admin);
        env.storage().instance().set(&DataKey::ListingCount, &0u32);
        env.storage().instance().set(&NFT_CONTRACT, &nft_contract);
        env.storage()
            .instance()
            .set(&RENTAL_AGREEMENT_CONTRACT, &agreement_contract);
        env.storage()
            .instance()
            .set(&ESCROW_CONTRACT, &escrow_contract);

        MarketplaceEvent::Initialized(admin, nft_contract, agreement_contract, escrow_contract)
            .publish(&env);
        Ok(())
    }

    pub fn is_initialized(env: Env) -> bool {
        let admin: Option<Address> = env.storage().instance().get::<_, Address>(&ADMIN);
        if admin.is_some() {
            return true;
        } else {
            return false;
        }
    }

    // Create a new listing
    pub fn create_listing(
        env: Env,
        owner: Address,
        offchain_list_id: String,
        purchase_type: PurchaseType,
        duration: u64,
        price: i128,
        metadata: String,
    ) -> Result<u32, Error> {
        owner.require_auth();

        let listing_count: u32 = env
            .storage()
            .instance()
            .get(&DataKey::ListingCount)
            .unwrap_or(0);
        let new_id: u32 = listing_count + 1;

        // Call NFT contract to mint a new token for this listing
        let nft_contract: Address = env.storage().instance().get(&NFT_CONTRACT).unwrap();

        let client = nft_contract_client::Client::new(&env, &nft_contract);
        let nft_id: u32 = client.mint(&owner, &new_id, &metadata);

        let listing: Listing = Listing {
            id: new_id,
            asset_id: offchain_list_id.clone(),
            owner,
            purchase_type,
            duration,
            price,
            status: ListingStatus::Available,
            nft_id,
        };

        env.storage()
            .instance()
            .set(&DataKey::Listing(new_id), &listing);
        env.storage()
            .instance()
            .set(&DataKey::ListingCount, &new_id);

        MarketplaceEvent::NewListing(new_id, nft_id, offchain_list_id).publish(&env);

        Ok(new_id)
    }

    pub fn update_listing(
        env: Env,
        listing_id: u32,
        new_price: i128,
        new_duration: u64,
        new_purchase_type: PurchaseType,
    ) -> Result<(), Error> {
        let mut listing: Listing = get_listing_by_id(&env, listing_id);
        listing.owner.require_auth();
        listing.price = new_price;
        listing.duration = new_duration;
        listing.purchase_type = new_purchase_type;

        env.storage()
            .instance()
            .set(&DataKey::Listing(listing_id), &listing);
        MarketplaceEvent::ListingUpdated(listing_id).publish(&env);
        Ok(())
    }

    pub fn get_listing(env: Env, listing_id: u32) -> Result<Listing, Error> {
        let listing: Listing = get_listing_by_id(&env, listing_id);
        Ok(listing)
    }

    pub fn get_all_listings(env: Env) -> Result<Vec<Listing>, Error> {
        let listing_count: u32 = env
            .storage()
            .instance()
            .get(&DataKey::ListingCount)
            .unwrap_or(0);
        let mut listings = Vec::new(&env);

        for id in 1..=listing_count {
            if let Some(listing) = env.storage().instance().get(&DataKey::Listing(id)) {
                listings.push_back(listing);
            }
        }

        Ok(listings)
    }

    pub fn remove_listing(env: Env, listing_id: u32) -> Result<(), Error> {
        env.storage()
            .instance()
            .remove(&DataKey::Listing(listing_id));

        Ok(())
    }

    pub fn change_listing_status(
        env: Env,
        listing_id: u32,
        status: ListingStatus,
    ) -> Result<(), Error> {
        let mut listing: Listing = get_listing_by_id(&env, listing_id);
        listing.status = status;
        env.storage()
            .instance()
            .set(&DataKey::Listing(listing_id), &listing);

        Ok(())
    }

    pub fn rent_or_purchase(
        env: Env,
        listing_id: u32,
        renter_or_buyer: Address,
        duration: u64,
        token_addr: Address,
        terms_url: String,
    ) -> Result<u32, Error> {
        renter_or_buyer.require_auth();

        let listing: Listing = get_listing_by_id(&env, listing_id);
        if listing.status != ListingStatus::Available {
            return Err(Error::ListingNotAvailable);
        }

        let escrow_contract: Address = env.storage().instance().get(&ESCROW_CONTRACT).unwrap();
        let escrow_client = escrow_contract_client::Client::new(&env, &escrow_contract);

        let token_client: token::TokenClient<'_> = token::Client::new(&env, &token_addr);
        let balance: i128 = token_client.balance(&renter_or_buyer);
        assert!(balance > listing.price, "Insufficient balance");
        token_client.transfer(&renter_or_buyer, &escrow_contract, &listing.price);

        // Pre-authorize the marketplace address for the escrow contract call
        // Grant auth for calling the function
        env.authorize_as_current_contract(vec![
            &env,
            InvokerContractAuthEntry::Contract(SubContractInvocation {
                context: ContractContext {
                    contract: escrow_contract.clone(),
                    fn_name: Symbol::new(&env, "lock_funds"),
                    args: (
                        listing_id.clone(),
                        listing.owner.clone(),
                        renter_or_buyer.clone(),
                        token_addr.clone(),
                        listing.price.clone(),
                    )
                        .into_val(&env),
                },
                sub_invocations: vec![&env],
            }),
        ]);
        
        // Call escrow contract to lock the funds
        escrow_client.lock_funds(
            &listing_id,
            &listing.owner,
            &renter_or_buyer,
            &token_addr,
            &listing.price,
        );

        let agreement_contract: Address = env
            .storage()
            .instance()
            .get(&RENTAL_AGREEMENT_CONTRACT)
            .unwrap();
        let agreement_client = agreement_contract_client::Client::new(&env, &agreement_contract);
        let is_rental: bool = listing.purchase_type == PurchaseType::Rent;
        let agreement_id: u32 = agreement_client.create_agreement(
            &listing_id,
            &renter_or_buyer,
            &listing.owner,
            &duration,
            &listing.price,
            &is_rental,
            &terms_url,
        );

        MarketplaceEvent::Purchase(
            listing_id,
            if is_rental {
                PurchaseType::Rent
            } else {
                PurchaseType::Buy
            },
            listing.owner,
            renter_or_buyer,
        )
        .publish(&env);
        Ok(agreement_id)
    }

    pub fn confirm_receipt(
        env: Env,
        renter_or_buyer: Address,
        listing_id: u32,
    ) -> Result<(), Error> {
        renter_or_buyer.require_auth();

        let mut listing: Listing = get_listing_by_id(&env, listing_id);

        // Transfer NFT ownership
        if listing.purchase_type == PurchaseType::Rent {
            listing.status = ListingStatus::Rented;
        } else {
            let nft_contract: Address = env.storage().instance().get(&NFT_CONTRACT).unwrap();
            let nft_client = nft_contract_client::Client::new(&env, &nft_contract);
            nft_client.transfer(&listing.owner, &renter_or_buyer, &listing.nft_id);
            listing.owner = renter_or_buyer.clone();
            listing.status = ListingStatus::Purchased;
        }

        let agreement_contract: Address = env
            .storage()
            .instance()
            .get(&RENTAL_AGREEMENT_CONTRACT)
            .unwrap();
        let agreement_client = agreement_contract_client::Client::new(&env, &agreement_contract);
        if listing.purchase_type == PurchaseType::Buy {
            agreement_client.complete_agreement(&listing_id, &renter_or_buyer);
        } else {
            agreement_client.owner_fulfilled(&listing_id);
        }

        env.storage()
            .instance()
            .set(&DataKey::Listing(listing_id), &listing);

        let escrow_contract: Address = env.storage().instance().get(&ESCROW_CONTRACT).unwrap();
        let escrow_client = escrow_contract_client::Client::new(&env, &escrow_contract);
        escrow_client.release(&listing_id);

        MarketplaceEvent::ConfirmedReceipt(listing_id, renter_or_buyer).publish(&env);

        Ok(())
    }

    pub fn cancel_sale_or_rental(env: Env, seller: Address, listing_id: u32) -> Result<(), Error> {
        seller.require_auth();

        let mut listing: Listing = get_listing_by_id(&env, listing_id);

        let agreement_contract: Address = env
            .storage()
            .instance()
            .get(&RENTAL_AGREEMENT_CONTRACT)
            .unwrap();
        let agreement_client = agreement_contract_client::Client::new(&env, &agreement_contract);
        agreement_client.terminate_agreement(&listing_id, &seller);

        let escrow_contract: Address = env.storage().instance().get(&ESCROW_CONTRACT).unwrap();
        let escrow_client = escrow_contract_client::Client::new(&env, &escrow_contract);
        escrow_client.refund(&listing_id);

        listing.status = ListingStatus::Available;
        env.storage()
            .instance()
            .set(&DataKey::Listing(listing_id), &listing);

        MarketplaceEvent::SaleOrRentalCancelled(listing_id, seller).publish(&env);

        Ok(())
    }

    // Owner calls this to confirm renter has returned item and agreement has been reached
    pub fn reclaim_or_return(env: Env, seller: Address, listing_id: u32) -> Result<(), Error> {
        seller.require_auth();
        let mut listing: Listing = get_listing_by_id(&env, listing_id);

        if listing.purchase_type == PurchaseType::Buy {
            return Err(Error::ListingTypeMismatch);
        }

        let agreement_contract: Address = env
            .storage()
            .instance()
            .get(&RENTAL_AGREEMENT_CONTRACT)
            .unwrap();
        let agreement_client = agreement_contract_client::Client::new(&env, &agreement_contract);
        agreement_client.complete_agreement(&listing_id, &seller);

        listing.status = ListingStatus::Available;
        env.storage()
            .instance()
            .set(&DataKey::Listing(listing_id), &listing);

        MarketplaceEvent::AssetReclaimed(listing_id, seller).publish(&env);

        Ok(())
    }
}

#[cfg(test)]
mod test;
