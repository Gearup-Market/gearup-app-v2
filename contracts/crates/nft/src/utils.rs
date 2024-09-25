use soroban_sdk::{Address, Env, Vec};

use crate::types::MARKETPLACE_CONTRACT;

pub fn remove_token_by_id(env: &Env, tokens: &mut Vec<u32>, id_to_remove: u32) {
    let mut new_tokens: Vec<u32> = Vec::new(env);
    for id in tokens.iter() {
        if id != id_to_remove {
            new_tokens.push_back(id);
        }
    }

    // Replace the original Vec with the filtered Vec
    *tokens = new_tokens;
}

pub fn require_marketplace_call(env: &Env) {
    let marketplace_address: Address = env
        .storage()
        .instance()
        .get(&MARKETPLACE_CONTRACT)
        .unwrap();
    marketplace_address.require_auth();
}
