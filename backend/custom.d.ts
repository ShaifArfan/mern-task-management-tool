declare namespace Express {
	export interface Request {
		user?: JwtUserPayload;
	}
}

type JwtUserPayload = {
	id: number;
	name: string;
};
