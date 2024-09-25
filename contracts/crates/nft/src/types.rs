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
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Token(u32),
    OwnedTokens(Address),
}

#[derive(Clone)]
#[contracttype]
pub struct Token {
    pub id: u32,
    pub owner: Address,
    pub metadata: String,
}

pub const ADMIN: Symbol = symbol_short!("ADMIN");
pub const MARKETPLACE_CONTRACT: Symbol = symbol_short!("MAR_CA");
