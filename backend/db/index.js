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

// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });
export default {
  query: (text, params, callback) => pool.query(text, params, callback),
};
