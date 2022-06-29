import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/Auth';
import './styles/global.scss';
import getApiBaseUrl from './utils/getApiBaseUrl';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = getApiBaseUrl();

const rootEl = document.getElementById('root')!;
ReactDOM.createRoot(rootEl).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>
);
