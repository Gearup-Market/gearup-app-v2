#![cfg(test)]

use soroban_sdk::{testutils::Events, IntoVal};
use crate::test::{MarketplaceEvent, MarketplaceTest};

#[test]
fn test_initialization() {
    let test = MarketplaceTest::setup_no_init();

    test.marketplace_client.initialize(
        &test.admin,
        &test.nft_client.address,
        &test.agreement_client.address,
        &test.escrow_client.address,
    );

    // Check Initialized event
    let event_expected = (
        test.marketplace_client.address.clone(),
        (MarketplaceEvent::Initialized(
            test.admin.clone(),
            test.nft_client.address.clone(),
            test.agreement_client.address.clone(),
            test.escrow_client.address.clone(),
        )
        .name(),)
            .into_val(&test.env),
        (
            &test.admin,
            &test.nft_client.address,
            &test.agreement_client.address,
            &test.escrow_client.address,
        )
            .into_val(&test.env),
    );
    
    assert!(
        test.env.events().all().contains(event_expected),
        "initialized event not present"
    );

    let is_initialized: bool = test.marketplace_client.is_initialized();
    assert_eq!(is_initialized, true);

}