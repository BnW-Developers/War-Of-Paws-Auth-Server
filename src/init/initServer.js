import { testAllConnections } from '../db/mysql/testDataBase.js';
import pools from './../db/mysql/createPool.js';

export const initServer = async () => {
  try {
    // redis랑 db 확인
    console.log('init server');
    await testAllConnections(pools);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
