export const AppRoutes = {
    userDashboard:{
        messages: "/user/messages",
        dashboard: "/user/dashboard",
        settings: "/user/settings",
        profile: "/user/profile",
        transactions: "/user/transactions",
        wallet: "/user/wallet",
    },
    users: "/users",
    userDetails: (userId: string) => `/users/${userId}`
}