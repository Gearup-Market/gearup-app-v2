use soroban_sdk::{Address, Env, IntoVal, String, Val, Vec};

use crate::types::PurchaseType;

pub enum MarketplaceEvent {
    Initialized(Address, Address, Address, Address),
    NewListing(u32, u32, String),
    ListingUpdated(u32),
    Purchase(u32, PurchaseType, Address, Address),
    ConfirmedReceipt(u32, Address),
    SaleOrRentalCancelled(u32, Address),
    AssetReclaimed(u32, Address),
}

impl MarketplaceEvent {
    pub fn name(&self) -> &'static str {
        match self {
            MarketplaceEvent::Initialized(..) => stringify!(Initialized),
            MarketplaceEvent::NewListing(..) => stringify!(NewListing),
            MarketplaceEvent::ListingUpdated(..) => stringify!(ListingUpdated),
            MarketplaceEvent::Purchase(..) => stringify!(Purchase),
            MarketplaceEvent::ConfirmedReceipt(..) => stringify!(ConfirmedReceipt),
            MarketplaceEvent::SaleOrRentalCancelled(..) => stringify!(SaleOrRentalCancelled),
            MarketplaceEvent::AssetReclaimed(..) => stringify!(AssetReclaimed),
        }
    }

    pub fn publish(&self, env: &Env) {
        let mut v: Vec<Val> = Vec::new(&env);

        match self {
            MarketplaceEvent::Initialized(admin, nft_contract, agreement_contract, escrow_contract) => {
                v.push_back(admin.into_val(env));
                v.push_back(nft_contract.into_val(env));
                v.push_back(agreement_contract.into_val(env));
                v.push_back(escrow_contract.into_val(env));
            }
            MarketplaceEvent::NewListing(listing_id, nft_id, asset_id) => {
                v.push_back(listing_id.into_val(env));
                v.push_back(nft_id.into_val(env));
                v.push_back(asset_id.into_val(env));
            }
            MarketplaceEvent::ListingUpdated(listing_id) => {
                v.push_back(listing_id.into_val(env));
            }
            MarketplaceEvent::Purchase(listing_id, purchase_type, owner, buyer) => {
                v.push_back(listing_id.into_val(env));
                v.push_back(purchase_type.into_val(env));
                v.push_back(owner.into_val(env));
                v.push_back(buyer.into_val(env));
            }
            MarketplaceEvent::ConfirmedReceipt(listing_id, renter) => {
                v.push_back(listing_id.into_val(env));
                v.push_back(renter.into_val(env));
            }
            MarketplaceEvent::SaleOrRentalCancelled(listing_id, owner) => {
                v.push_back(listing_id.into_val(env));
                v.push_back(owner.into_val(env));
            }
            MarketplaceEvent::AssetReclaimed(listing_id, owner) => {
                v.push_back(listing_id.into_val(env));
                v.push_back(owner.into_val(env));
            }
        }

        env.events().publish((self.name(),), v)
    }
}
