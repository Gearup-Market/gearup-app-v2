#![cfg(test)]
extern crate std;

use soroban_sdk::testutils::Events;
use soroban_sdk::{Env, IntoVal, String};

use crate::test::{marketplace::PurchaseType, MarketplaceEvent};
use crate::types::PurchaseType as PurchaseType2;

use super::{marketplace::Listing, MarketplaceTest};

#[test]
fn test_purchase_or_rent() {
    let test: MarketplaceTest<'_> = MarketplaceTest::setup();
    let duration: u64 = get_one_hour_duration(&test.env);
    let price: i128 = 1_000_i128; //1_000 in 18 decimals
    let offchain_list_id: String = String::from_str(&test.env, "acy23bza");
    let metadata: String = String::from_str(
        &test.env,
        "https://gearup.market/listings/290zds9olashe9we0239jdo42jas",
    );
    let terms_url: String = String::from_str(
        &test.env,
        "https://gearup.market/listings/290zds9olashe9we0239jdo42jas/terms",
    );

    let listing_id: u32 = test.marketplace_client.create_listing(
        &test.alice,
        &offchain_list_id,
        &PurchaseType::Rent,
        &duration,
        &price,
        &metadata,
    );

    // Verify listing
    let listing: Listing = test.marketplace_client.get_listing(&listing_id);
    assert_eq!(listing.owner, test.alice);
    assert!(
        test.token_client.balance(&test.bob) > 0,
        "Token balance is not empty"
    );

    test.marketplace_client.rent_or_purchase(
        &listing_id,
        &test.bob,
        &duration,
        &test.token_client.address,
        &terms_url,
    );

    let purchase_type: PurchaseType2 = if listing.purchase_type == PurchaseType::Rent {
        PurchaseType2::Rent
    } else {
        PurchaseType2::Buy
    };

    // Check NewListing event
    let event_expected = (
        test.marketplace_client.address.clone(),
        (MarketplaceEvent::Purchase(
            listing_id.clone(),
            purchase_type.clone(),
            listing.owner.clone(),
            test.bob.clone(),
        )
        .name(),)
            .into_val(&test.env),
        (listing_id, purchase_type, listing.owner, test.bob).into_val(&test.env),
    );

    assert!(
        test.env.events().all().contains(event_expected),
        "purchase event not present"
    );
}

fn get_one_hour_duration(env: &Env) -> u64 {
    let current_ledger_time: u64 = env.ledger().timestamp(); // Get the current ledger time in seconds
    let one_hour_in_seconds: u64 = 3600; // 1 hour in seconds
    current_ledger_time + one_hour_in_seconds
}
