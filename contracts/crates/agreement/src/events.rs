use soroban_sdk::{Address, Env, IntoVal, Val, Vec};

use crate::types::AgreementType;

pub enum AgreementEvent {
    Initialized,
    Created(u32, Address, Address, AgreementType),
    Fulfilled(u32, Address),
    Completed(u32, Address),
    Terminated(u32, Address)
}

impl AgreementEvent {
    pub fn name(&self) -> &'static str {
        match self {
            AgreementEvent::Initialized => stringify!(Initialized),
            AgreementEvent::Created(..) => stringify!(Created),
            AgreementEvent::Fulfilled(..) => stringify!(Fulfilled),
            AgreementEvent::Completed(..) => stringify!(Completed),
            AgreementEvent::Terminated(..) => stringify!(Terminated),
        }
    }

    pub fn publish(&self, env: &Env) {
        let mut v: Vec<Val> = Vec::new(&env);

        match self {
            AgreementEvent::Initialized => {}
            AgreementEvent::Created(listing_id, seller, buyer, agreement_type) => {
                v.push_back(listing_id.into_val(env));
                v.push_back(seller.into_val(env));
                v.push_back(buyer.into_val(env));
                v.push_back(agreement_type.into_val(env));
            }
            AgreementEvent::Fulfilled(listing_id, owner) => {
                v.push_back(listing_id.into_val(env));
                v.push_back(owner.into_val(env));
            }
            AgreementEvent::Completed(listing_id, buyer) => {
                v.push_back(listing_id.into_val(env));
                v.push_back(buyer.into_val(env));
            }
            AgreementEvent::Terminated(listing_id, terminator) => {
                v.push_back(listing_id.into_val(env));
                v.push_back(terminator.into_val(env));
            }
        }

        env.events().publish((self.name(),), v)
    }
}
