import 'dotenv/config';
import pg from "pg";

const { Pool } = pg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
};
const db = new Pool(configDatabase);
db.connect(err => {
  if(err) return console.error(err);
  console.log('DataBase connected');
});

export default db