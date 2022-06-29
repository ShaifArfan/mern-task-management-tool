import axios from 'axios';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import classes from './AuthForm.module.scss';

function Register() {
	const [regFields, setRegFields] = useState({
		email: '',
		name: '',
		password: '',
	});

	const register = async (e: FormEvent) => {
		e.preventDefault();
		const user = {
			name: regFields.name,
			email: regFields.email,
			password: regFields.password,
		};
		try {
			await axios.post(`/api/auth/register`, user);
			toast.success('Registered successfully');
		} catch (err) {
			console.log(err);
			toast.error('Something went wrong');
		}
	};

	return (
		<div className={classes.register}>
			<h1 className={classes.title}>Register</h1>
			<form className={classes.authForm} onSubmit={register}>
				<label htmlFor="name">
					Full Name:
					<input
						name="name"
						type="text"
						placeholder="Full Name"
						required
						value={regFields.name}
						onChange={e =>
							setRegFields(prev => ({ ...prev, name: e.target.value }))
						}
					/>
				</label>
				<label htmlFor="email">
					email:
					<input
						name="email"
						type="email"
						placeholder="email"
						required
						value={regFields.email}
						onChange={e =>
							setRegFields(prev => ({ ...prev, email: e.target.value }))
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
						value={regFields.password}
						onChange={e =>
							setRegFields(prev => ({ ...prev, password: e.target.value }))
						}
					/>
				</label>
				<br />
				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default Register;
