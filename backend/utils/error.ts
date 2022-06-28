interface ErrorWithStatus extends Error {
	statusCode: number;
}

export const createError = ({
	message,
	statusCode,
}: {
	message: string;
	statusCode: number;
}) => {
	const error = new Error() as ErrorWithStatus;
	error.message = message;
	error.statusCode = statusCode;
	return error;
};
