import { formatDate } from './utils.js';

const testDbConnection = async (pool) => {
  try {
    await pool.query('SELECT 1 + 1 AS solution');
    const date = new Date();
    console.log(`[${formatDate(date)} - CONNECT] Database connected successfully `);
  } catch (err) {
    const date = new Date();
    console.log(err);
    console.error(`[${formatDate(date)} - FAIL] Failed to connect database`);
    process.exit(1);
  }
};

export const testAllConnections = async (pools) => {
  await testDbConnection(pools.USER_DB);
};
