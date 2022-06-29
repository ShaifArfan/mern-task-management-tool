import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

interface authContext {
	auth: boolean | undefined;
	verifyAuth: () => void;
}
const AuthContext = createContext<authContext>({
	auth: undefined,
	verifyAuth: () => {},
});

interface props {
	children: React.ReactNode;
}

export function AuthProvider({ children }: props) {
	const [auth, setAuth] = useState<boolean | undefined>(undefined);

	const verifyAuth = async () => {
		const isLoggedIn = await axios.get(`/api/auth/is_logged_in`);
		setAuth(isLoggedIn.data);
		return isLoggedIn.data;
	};

	useEffect(() => {
		verifyAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ auth, verifyAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
