#![cfg(test)]
extern crate std;

use super::*;
use soroban_sdk::testutils::Address as _;
use soroban_sdk::{log, Address};

pub mod marketplace {
    soroban_sdk::contractimport!(
        file = "../../target/wasm32-unknown-unknown/release/marketplace.wasm"
    );
    pub type MarketplaceClient<'a> = Client<'a>;
}

pub mod nft {
    soroban_sdk::contractimport!(file = "../../target/wasm32-unknown-unknown/release/nft.wasm");
    pub type NFTClient<'a> = Client<'a>;
}

pub mod agreement {
    soroban_sdk::contractimport!(file = "../../target/wasm32-unknown-unknown/release/agreement.wasm");
    pub type AgreementClient<'a> = Client<'a>;
}

pub mod escrow {
    soroban_sdk::contractimport!(file = "../../target/wasm32-unknown-unknown/release/escrow.wasm");
    pub type EscrowClient<'a> = Client<'a>;
}

use marketplace::MarketplaceClient;
use nft::NFTClient;
use agreement::AgreementClient;
use escrow::EscrowClient;

fn create_marketplace_contract<'a>(env: &Env) -> MarketplaceClient<'a> {
    let contract_id: Address = env.register_contract_wasm(None, marketplace::WASM);
    let contract_client: marketplace::Client<'_> = MarketplaceClient::new(env, &contract_id);
    contract_client
}

fn create_nft_contract<'a>(env: &Env) -> NFTClient<'a> {
    let contract_id: Address = env.register_contract_wasm(None, nft::WASM);
    let contract_client: nft::Client<'_> = NFTClient::new(env, &contract_id);
    contract_client
}

fn create_agreement_contract<'a>(env: &Env) -> AgreementClient<'a> {
    let contract_id: Address = env.register_contract_wasm(None, agreement::WASM);
    let contract_client: agreement::Client<'_> = AgreementClient::new(env, &contract_id);
    contract_client
}

fn create_escrow_contract<'a>(env: &Env) -> EscrowClient<'a> {
    let contract_id: Address = env.register_contract_wasm(None, escrow::WASM);
    let contract_client: escrow::Client<'_> = EscrowClient::new(env, &contract_id);
    contract_client
}

fn create_token_contract<'a>(
    e: &Env,
    admin: &Address,
) -> (token::Client<'a>, token::StellarAssetClient<'a>) {
    let sac = e.register_stellar_asset_contract_v2(admin.clone());
    (
        token::Client::new(e, &sac.address()),
        token::StellarAssetClient::new(e, &sac.address()),
    )
}

pub struct MarketplaceTest<'a> {
    env: Env,
    marketplace_client: MarketplaceClient<'a>,
    nft_client: NFTClient<'a>,
    agreement_client: AgreementClient<'a>,
    escrow_client: EscrowClient<'a>,
    token_client: token::TokenClient<'a>,
    alice: Address,
    bob: Address,
    admin: Address,
}

impl<'a> MarketplaceTest<'a> {
    fn setup() -> Self {
        let test = Self::setup_no_init();

        test.marketplace_client.initialize(
            &test.admin,
            &test.nft_client.address,
            &test.agreement_client.address,
            &test.escrow_client.address,
        );
        test.nft_client.initialize(&test.admin, &test.marketplace_client.address);
        test.agreement_client.initialize(&test.admin, &test.marketplace_client.address);
        test.escrow_client.init(&test.marketplace_client.address);

        return test;
    }

    fn setup_no_init() -> Self {
        let env: Env = Env::default();
        env.mock_all_auths();

        let marketplace_client: marketplace::Client<'_> = create_marketplace_contract(&env);
        let nft_client: nft::Client<'_> = create_nft_contract(&env);
        let agreement_client: agreement::Client<'_> = create_agreement_contract(&env);
        let escrow_client: escrow::Client<'_> = create_escrow_contract(&env);
        
        // Generate the accounts (users)
        let alice: Address = Address::generate(&env);
        let bob: Address = Address::generate(&env);
        let admin: Address = Address::generate(&env);

        assert_ne!(alice, bob);
        assert_ne!(alice, admin);
        assert_ne!(bob, admin);
        
        let (token_client, token_admin_client) = create_token_contract(&env, &admin);
        token_admin_client.mint(&bob, &10_000_i128);
        let balance = token_client.balance(&bob);
        log!(&env, "Bob's balance is {}!", balance);


        return MarketplaceTest {
            env,
            marketplace_client,
            nft_client,
            agreement_client,
            escrow_client,
            token_client,
            alice,
            bob,
            admin,
        };
    }
}

mod initialize;
mod create_listing;
mod purchase_or_rent;


// owner: Address,
// offchain_list_id: String,
// purchase_type: PurchaseType,
// duration: u64,
// price: i128,
// metadata: String,

// #[test]
// fn test_list_item() {
//     let env = Env::default();
//     let (client, nft_client) = setup(&env);

//     let owner: Address = Address::generate(&env);

//     env.mock_all_auths();

//     client.create_listing(
//         &owner,
//         &String::from_str(&env, "acy23bza"),
//         &PurchaseType::Rent,
//         duration,
//         price,
//         metadata,
//     );

//     // let listing_id = client.list_item(
//     //     &seller,
//     //     &Symbol::short("camera"),
//     //     &100,
//     //     &token,
//     //     &ListingType::Sale,
//     //     &0,
//     // );

//     // // Verify listing
//     // let listing = client.get_listing(&listing_id);
//     // assert_eq!(listing.seller, seller);
//     // assert_eq!(listing.item, Symbol::short("camera"));
//     // assert_eq!(listing.price, 100);
//     // assert_eq!(listing.token, token);
//     // assert_eq!(listing.status, Symbol::short("active"));
//     // assert!(matches!(listing.listing_type, ListingType::Sale));
// }

// #[test]
// fn test_purchase_or_rent() {
//     let env = Env::default();
//     let contract_id = env.register_contract(None, Marketplace);
//     let client = MarketplaceClient::new(&env, &contract_id);

//     let escrow_address = Address::random(&env);
//     let seller = Address::random(&env);
//     let buyer = Address::random(&env);
//     let token = Address::random(&env);
//     client.init(&escrow_address);

//     env.mock_all_auths();

//     // List item
//     let listing_id = client.list_item(
//         &seller,
//         &Symbol::short("camera"),
//         &100,
//         &token,
//         &ListingType::Sale,
//         &0,
//     );

//     // Mock buyer signature
//     let buyer_signature = Bytes::random(&env);

//     // Purchase item
//     let escrow_id = client.purchase_or_rent(&buyer, &listing_id, &buyer_signature);

//     // Verify listing status
//     let listing = client.get_listing(&listing_id);
//     assert_eq!(listing.status, Symbol::short("pending"));

//     // In a real test, we would also verify the escrow creation by calling the Escrow contract
// }

// #[test]
// fn test_confirm_delivery() {
//     let env = Env::default();
//     let contract_id = env.register_contract(None, Marketplace);
//     let client = MarketplaceClient::new(&env, &contract_id);

//     let escrow_address = Address::random(&env);
//     let seller = Address::random(&env);
//     let buyer = Address::random(&env);
//     let token = Address::random(&env);
//     client.init(&escrow_address);

//     env.mock_all_auths();

//     // List and purchase item
//     let listing_id = client.list_item(
//         &seller,
//         &Symbol::short("camera"),
//         &100,
//         &token,
//         &ListingType::Sale,
//         &0,
//     );
//     let buyer_signature = Bytes::random(&env);
//     let escrow_id = client.purchase_or_rent(&buyer, &listing_id, &buyer_signature);

//     // Confirm delivery
//     client.confirm_delivery(&buyer, &listing_id, &escrow_id);

//     // Verify listing status
//     let listing = client.get_listing(&listing_id);
//     assert_eq!(listing.status, Symbol::short("completed"));
// }

// #[test]
// fn test_cancel_sale_or_rental() {
//     let env = Env::default();
//     let contract_id = env.register_contract(None, Marketplace);
//     let client = MarketplaceClient::new(&env, &contract_id);

//     let escrow_address = Address::random(&env);
//     let seller = Address::random(&env);
//     let buyer = Address::random(&env);
//     let token = Address::random(&env);
//     client.init(&escrow_address);

//     env.mock_all_auths();

//     // List and purchase item
//     let listing_id = client.list_item(
//         &seller,
//         &Symbol::short("camera"),
//         &100,
//         &token,
//         &ListingType::Sale,
//         &0,
//     );
//     let buyer_signature = Bytes::random(&env);
//     let escrow_id = client.purchase_or_rent(&buyer, &listing_id, &buyer_signature);

//     // Cancel sale
//     client.cancel_sale_or_rental(&seller, &listing_id, &escrow_id);

//     // Verify listing status
//     let listing = client.get_listing(&listing_id);
//     assert_eq!(listing.status, Symbol::short("cancelled"));
// }

// Add more tests as needed...
