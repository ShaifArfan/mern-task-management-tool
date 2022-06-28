import pg from 'pg';

const { Pool } = pg;

const dbOptions = {
	user: 'postgres',
	password: 'postgres',
	host: 'localhost',
	database: 'task_management_tool_tut',
	port: 5432,
};

const pool = new Pool(dbOptions);

export default {
	query: (text: string, params?: Array<any>) => pool.query(text, params),
};
