use soroban_sdk::{contracterror, contracttype, symbol_short, Address, String, Symbol};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    ListingNotFound = 1,
    ListingNotAvailable = 2,
    ListingTypeMismatch = 3,
    AlreadyInitialized = 4,
    InvalidNftOwner = 5,
    MissingMarketplaceContractId = 6,
    AgreementNotFound = 7,
    AgreementNotActive = 8,
    AgreementNotOwnedByCaller = 9,
    StateNotAlreadySet = 10,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Listing {
    pub id: u32,
    pub asset_id: String,
    pub owner: Address,
    pub purchase_type: PurchaseType,
    pub duration: u64, // Duration is 0 for purchases
    pub price: i128,
    pub status: ListingStatus,
    pub nft_id: u32,
}

#[derive(Clone, Debug, Copy, PartialEq, Eq)]
#[contracttype]
pub enum PurchaseType {
    Rent = 1,
    Buy = 2,
}

#[derive(Clone, Debug, Copy, PartialEq, Eq)]
#[contracttype]
pub enum ListingStatus {
    Available = 1,
    Rented = 2,
    Leased = 3,
    Purchased = 4,
    Unavailable = 5,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Listing(u32),
    ListingCount,
}

pub const ADMIN: Symbol = symbol_short!("ADMIN");
pub const NFT_CONTRACT: Symbol = symbol_short!("NFT_CA");
pub const RENTAL_AGREEMENT_CONTRACT: Symbol = symbol_short!("RAGR_CA");
pub const ESCROW_CONTRACT: Symbol = symbol_short!("ESCROW_CA");
