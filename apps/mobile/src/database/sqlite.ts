import * as SQLite from "expo-sqlite";

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function getDatabase() {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync("tractorseva.db");
  }

  return databasePromise;
}

export async function initializeDatabase() {
  const db = await getDatabase();
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS farmers (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      mobile TEXT,
      village TEXT NOT NULL,
      notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      deleted_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_farmers_name
      ON farmers(name);

    CREATE INDEX IF NOT EXISTS idx_farmers_village
      ON farmers(village);
  `);
}
