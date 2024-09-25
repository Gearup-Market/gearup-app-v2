use soroban_sdk::{contract, contractimpl, Address, Env, String, Symbol, Vec};

use crate::{
    events::NFTEvent, types::{DataKey, Error, Token, ADMIN, MARKETPLACE_CONTRACT}, utils::{remove_token_by_id, require_marketplace_call}
};

#[contract]
pub struct NFT;

#[contractimpl]
impl NFT {
    pub fn initialize(
        env: Env,
        admin: Address,
        marketplace_contract_id: Address,
    ) -> Result<(), Error> {
        admin.require_auth();
        if env.storage().instance().has::<Symbol>(&ADMIN) {
            return Err(Error::AlreadyInitialized);
        }
        if marketplace_contract_id.clone().to_string().is_empty() {
            return Err(Error::MissingMarketplaceContractId);
        }
        env.storage().instance().set(&ADMIN, &admin);
        env.storage()
            .instance()
            .set(&MARKETPLACE_CONTRACT, &marketplace_contract_id);

        NFTEvent::Initialized.publish(&env);
        Ok(())
    }

    pub fn mint(env: Env, owner: Address, token_id: u32, metadata: String) -> Result<u32, Error> {
        require_marketplace_call(&env);

        let token: Token = Token {
            id: token_id.clone(),
            owner: owner.clone(),
            metadata,
        };
        env.storage()
            .instance()
            .set(&DataKey::Token(token_id), &token);

        let mut owned_tokens: Vec<u32> = env
            .storage()
            .instance()
            .get(&DataKey::OwnedTokens(owner.clone()))
            .unwrap_or(Vec::new(&env));
        owned_tokens.push_back(token_id);
        env.storage()
            .instance()
            .set(&DataKey::OwnedTokens(owner.clone()), &owned_tokens);

        NFTEvent::Mint(token_id, owner).publish(&env);

        Ok(token_id)
    }

    pub fn owner_of(env: Env, token_id: u32) -> Result<Address, Error> {
        let token: Token = env
            .storage()
            .instance()
            .get::<_, Token>(&DataKey::Token(token_id))
            .unwrap();
        Ok(token.owner)
    }

    pub fn token_metadata(env: Env, token_id: u32) -> Result<String, Error> {
        let token: Token = env
            .storage()
            .instance()
            .get::<_, Token>(&DataKey::Token(token_id))
            .unwrap();
        Ok(token.metadata)
    }

    pub fn get_owned_tokens(env: Env, owner: Address) -> Result<Vec<u32>, Error> {
        let tokens: Vec<u32> = env
            .storage()
            .instance()
            .get(&DataKey::OwnedTokens(owner))
            .unwrap_or(Vec::new(&env));
        Ok(tokens)
    }

    pub fn transfer(env: Env, from: Address, to: Address, token_id: u32) -> Result<bool, Error> {
        require_marketplace_call(&env);

        let mut token: Token = env
            .storage()
            .instance()
            .get::<_, Token>(&DataKey::Token(token_id))
            .unwrap();
        if token.owner != from {
            return Err(Error::InvalidNftOwner);
        }

        token.owner = to.clone();
        env.storage()
            .instance()
            .set(&DataKey::Token(token_id), &token);

        // Update OwnedTokens for both 'from' and 'to' addresses
        let mut from_tokens: Vec<u32> = env
            .storage()
            .instance()
            .get(&DataKey::OwnedTokens(from.clone()))
            .unwrap_or(Vec::new(&env));
        remove_token_by_id(&env, &mut from_tokens, token_id);
        env.storage()
            .instance()
            .set(&DataKey::OwnedTokens(from.clone()), &from_tokens);

        let mut to_tokens: Vec<u32> = env
            .storage()
            .instance()
            .get(&DataKey::OwnedTokens(to.clone()))
            .unwrap_or(Vec::new(&env));
        to_tokens.push_back(token_id);
        env.storage()
            .instance()
            .set(&DataKey::OwnedTokens(to.clone()), &to_tokens);

        NFTEvent::Transfer(token_id, from, to).publish(&env);
        Ok(true)
    }
}