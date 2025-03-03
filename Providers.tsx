"use client";
import { AppProvider } from "@/contexts/AppContext";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/api/api";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store!}>
				<PersistGate persistor={persistor}>
					<Toaster
						toastOptions={{
							style: {
								zIndex: 9999999
							}
						}}
					/>
					<AuthProvider>
						<AppProvider>{children}</AppProvider>
					</AuthProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	);
};

export default Providers;
