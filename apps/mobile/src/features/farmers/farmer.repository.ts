import { getDatabase } from "../../database/sqlite";
import { FarmerInput, normalizeFarmer } from "./farmer.validation";

import * as Crypto from "expo-crypto";

export type Farmer = FarmerInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type FarmerRow = {
  id: string;
  name: string;
  mobile: string | null;
  village: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

function mapFarmer(row: FarmerRow): Farmer {
  return {
    id: row.id,
    name: row.name,
    mobile: row.mobile ?? "",
    village: row.village,
    notes: row.notes ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createFarmer(input: FarmerInput): Promise<Farmer> {
  const db = await getDatabase();
  const farmer = normalizeFarmer(input);
  const id = Crypto.randomUUID();
  const now = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO farmers
      (id, name, mobile, village, notes,
       created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      farmer.name,
      farmer.mobile || null,
      farmer.village,
      farmer.notes || null,
      now,
      now,
    ],
  );
  return {
    id,
    ...farmer,
    createdAt: now,
    updatedAt: now,
  };
}

export async function listFarmers(search = ""): Promise<Farmer[]> {
  const db = await getDatabase();

  const term = `%${search.trim()}%`;

  const rows = await db.getAllAsync<FarmerRow>(
    `SELECT *
     FROM farmers
     WHERE deleted_at IS NULL
       AND (
         name LIKE ?
         OR village LIKE ?
         OR mobile LIKE ?
       )
     ORDER BY name COLLATE NOCASE ASC`,
    [term, term, term],
  );

  return rows.map(mapFarmer);
}

export async function updateFarmer(
  id: string,
  input: FarmerInput,
): Promise<void> {
  const db = await getDatabase();
  const farmer = normalizeFarmer(input);

  const result = await db.runAsync(
    `UPDATE farmers
     SET name = ?, mobile = ?, village = ?,
         notes = ?, updated_at = ?
     WHERE id = ? AND deleted_at IS NULL`,
    [
      farmer.name,
      farmer.mobile || null,
      farmer.village,
      farmer.notes || null,
      new Date().toISOString(),
      id,
    ],
  );

  if (result.changes !== 1) {
    throw new Error("Farmer not found");
  }
}
