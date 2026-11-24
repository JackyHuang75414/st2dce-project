import pg from "pg";

const { Pool } = pg;

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 2000,
    });
    pool.on("error", (error) => {
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: "error",
        message: "database pool error",
        error: error.message,
      }));
    });
  }
  return pool;
}

export async function ping() {
  const client = await getPool().connect();
  try {
    await client.query("SELECT 1");
  } finally {
    client.release();
  }
}

export async function initSchema() {
  await getPool().query(
    "CREATE TABLE IF NOT EXISTS items (" +
      "id SERIAL PRIMARY KEY, " +
      "name TEXT NOT NULL, " +
      "created_at TIMESTAMPTZ NOT NULL DEFAULT now())",
  );
}
