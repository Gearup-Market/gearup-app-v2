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
    AgreementIsAlreadyActive = 10
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Agreement(u32),
}

#[derive(Clone)]
#[contracttype]
pub struct Agreement {
    pub owner: Address,
    pub renter_or_buyer: Address,
    pub start_time: u64,
    pub end_time: u64,
    pub price: i128,
    pub is_rental: bool,
    pub terms_url: String,
    pub status: AgreementStatus,
    pub agreement_type: AgreementType
}

#[derive(Clone, Copy, PartialEq, Eq)]
#[contracttype]
pub enum AgreementType {
    Lease,
    Permanent
}

#[derive(Clone, Copy, PartialEq, Eq)]
#[contracttype]
pub enum AgreementStatus {
    Created = 1,
    Active = 2,
    Completed = 3,
    Terminated = 4,
    Paused = 5,
}

pub const ADMIN: Symbol = symbol_short!("ADMIN");
pub const MARKETPLACE_CONTRACT: Symbol = symbol_short!("MAR_CA");
