#![cfg(test)]

use soroban_sdk::testutils::{Events, Ledger};
use soroban_sdk::{Env, IntoVal, String};

use crate::test::{
    marketplace::{Listing, ListingStatus},
    MarketplaceEvent,
};

use super::{marketplace::PurchaseType, MarketplaceTest};

#[test]
fn test_create_listing() {
    let test: MarketplaceTest<'_> = MarketplaceTest::setup();
    let duration: u64 = get_one_hour_duration(&test.env);
    let price: i128 = 1_000_000_000_000_000_000_000; //1_000 in 18 decimals
    let offchain_list_id = String::from_str(&test.env, "acy23bza");
    let metadata = String::from_str(
        &test.env,
        "https://gearup.market/listings/290zds9olashe9we0239jdo42jas",
    );

    let listing_id: u32 = test.marketplace_client.create_listing(
        &test.alice,
        &offchain_list_id,
        &PurchaseType::Rent,
        &duration,
        &price,
        &metadata,
    );

    // Check NewListing event
    let event_expected = (
        test.marketplace_client.address.clone(),
        (MarketplaceEvent::NewListing(listing_id.clone(), listing_id.clone(), offchain_list_id.clone()).name(),)
            .into_val(&test.env),
        (listing_id, listing_id, offchain_list_id.clone()).into_val(&test.env),
    );

    assert!(
        test.env.events().all().contains(event_expected),
        "new listing event not present"
    );

    // Verify listing
    let listing: Listing = test.marketplace_client.get_listing(&listing_id);
    assert_eq!(listing.owner, test.alice);
    assert_eq!(listing.asset_id, offchain_list_id);
    assert_eq!(listing.price, price);
    assert_eq!(listing.status, ListingStatus::Available);
    assert!(listing.duration > test.env.ledger().timestamp());
    // adjust timestamp
    test.env.ledger().set_timestamp(duration);

    let listing2: Listing = test.marketplace_client.get_listing(&listing_id);
    assert!(
        listing2.duration <= test.env.ledger().timestamp(),
        "Expected {} to be less than current timestamp",
        listing.duration,
    );
}

fn get_one_hour_duration(env: &Env) -> u64 {
    let current_ledger_time: u64 = env.ledger().timestamp(); // Get the current ledger time in seconds
    let one_hour_in_seconds: u64 = 3600; // 1 hour in seconds
    current_ledger_time + one_hour_in_seconds
}
