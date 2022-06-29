import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import classes from './AuthForm.module.scss';

function Login() {
	const { verifyAuth, auth } = useAuth();
	const navigate = useNavigate();
	const [loginFields, setLoginFields] = useState<{
		email: string;
		password: string;
	}>({ email: '', password: '' });

	useEffect(() => {
		if (auth) {
			navigate('/');
		}
	}, [auth]);

	const login = async (e: FormEvent) => {
		e.preventDefault();
		const { email, password } = loginFields;
		try {
			await axios.post(`/api/auth/login`, {
				email,
				password,
			});
			await verifyAuth();
			navigate('/');
		} catch (err) {
			console.log(err);
			verifyAuth();
		}
	};
	return (
		<div className={classes.register}>
			<h1 className={classes.title}>Login</h1>
			<form className={classes.authForm} onSubmit={login}>
				<label htmlFor="email">
					email:
					<input
						name="email"
						type="email"
						placeholder="email"
						value={loginFields.email}
						onChange={e =>
							setLoginFields(prev => ({ ...prev, email: e.target.value }))
						}
					/>
				</label>
				<br />
				<label htmlFor="password">
					password:
					<input
						name="password"
						type="password"
						placeholder="password"
						required
						value={loginFields.password}
						onChange={e =>
							setLoginFields(prev => ({ ...prev, password: e.target.value }))
						}
					/>
				</label>
				<br />
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default Login;
