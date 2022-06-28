import express, { Request, Response } from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import allRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 8000;
const CLIENT_URL_STRING = process.env.CLIENT_URL || 'http://localhost:3000';

const allowedDomains = CLIENT_URL_STRING.split(', ');
console.log(allowedDomains);

// middleware
app.use(
	cors({
		credentials: true,
		origin(origin, callback) {
			// bypass the requests with no origin (like curl requests, mobile apps, etc )
			if (!origin) return callback(null, true);

			if (allowedDomains.indexOf(origin) === -1) {
				const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	})
);
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api', allRoutes);

interface error {
	statusCode?: number;
	message?: string;
	stack?: string;
}
// error handler
app.use((err: error, _: Request, res: Response) => {
	const status = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(status).json({ message, stack: err.stack });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
