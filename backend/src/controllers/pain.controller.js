import crypto from "node:crypto";
import { database } from "../db/index.js";

function normalizeEntry(row) {
  if (!row) return row;
  if (typeof row.regions === "string") {
    try {
      row.regions = JSON.parse(row.regions);
    } catch {
      row.regions = [];
    }
  }
  return row;
}

export async function listEntries(request, response, next) {
  try {
    const [rows] = await database.query(
      `SELECT id,recorded_at,regions,max_intensity,mood,sleep_hours,notes,created_at
       FROM pain_entries WHERE user_id = ? ORDER BY recorded_at DESC LIMIT 200`,
      [request.user.sub],
    );
    response.json({ success: true, data: rows.map(normalizeEntry) });
  } catch (error) {
    next(error);
  }
}

export async function createEntry(request, response, next) {
  try {
    const body = request.body ?? {};
    const regions = Array.isArray(body.regions) ? body.regions : [];
    const maxIntensity = Math.max(...regions.map((region) => Number(region.intensity ?? 0)), 0);
    if (!regions.length || maxIntensity < 0 || maxIntensity > 10) {
      return next(new Error("Select at least one pain area"));
    }
    const id = crypto.randomUUID();
    await database.query(
      `INSERT INTO pain_entries
       (id,user_id,regions,max_intensity,mood,sleep_hours,notes,recorded_at)
       VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)`,
      [
        id,
        request.user.sub,
        JSON.stringify(regions),
        maxIntensity,
        body.mood || null,
        body.sleep_hours ?? null,
        body.notes?.trim() || null,
      ],
    );
    const [[row]] = await database.query(
      "SELECT id,recorded_at,regions,max_intensity,mood,sleep_hours,notes FROM pain_entries WHERE id = ?",
      [id],
    );
    response.status(201).json({ success: true, data: normalizeEntry(row) });
  } catch (error) {
    next(error);
  }
}

export async function deleteEntry(request, response, next) {
  try {
    const [result] = await database.query(
      "DELETE FROM pain_entries WHERE id = ? AND user_id = ?",
      [request.params.id, request.user.sub],
    );
    if (!result.affectedRows) {
      return next(new Error("Pain entry not found"));
    }
    response.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function deleteAllEntries(request, response, next) {
  try {
    await database.query("DELETE FROM pain_entries WHERE user_id = ?", [request.user.sub]);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
}
