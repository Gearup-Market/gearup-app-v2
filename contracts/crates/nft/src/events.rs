use soroban_sdk::{Address, Env, IntoVal, Val, Vec};

pub enum NFTEvent {
    Initialized,
    Mint(u32, Address),
    Transfer(u32, Address, Address),
}

impl NFTEvent {
    pub fn name(&self) -> &'static str {
        match self {
            NFTEvent::Initialized => stringify!(Initialized),
            NFTEvent::Mint(..) => stringify!(Mint),
            NFTEvent::Transfer(..) => stringify!(Transfer),
        }
    }

    pub fn publish(&self, env: &Env) {
        let mut v: Vec<Val> = Vec::new(&env);

        match self {
            NFTEvent::Initialized => {}
            NFTEvent::Mint(token_id, owner) => {
                v.push_back(token_id.into_val(env));
                v.push_back(owner.into_val(env));
            }
            NFTEvent::Transfer(token_id, from, to) => {
                v.push_back(token_id.into_val(env));
                v.push_back(from.into_val(env));
                v.push_back(to.into_val(env));
            }
        }

        env.events().publish((self.name(),), v)
    }
}
