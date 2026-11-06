import crypto from "node:crypto";
import { database } from "../db/index.js";
import { HttpError } from "../utils/httpError.js";

export async function getProfessionalProfile(request, response, next) {
  try {
    const [rows] = await database.query(
      "SELECT * FROM professional_profiles WHERE user_id = ? LIMIT 1",
      [request.user.sub],
    );
    const row = rows[0] ? { ...rows[0], services: parseServices(rows[0].services) } : null;
    response.json({ success: true, data: row });
  } catch (error) {
    next(error);
  }
}

export async function saveProfessionalProfile(request, response, next) {
  try {
    const body = request.body ?? {};
    for (const field of ["full_name", "profession", "license_number"]) {
      if (!String(body[field] ?? "").trim()) throw new HttpError(400, `${field.replace("_", " ")} is required`);
    }
    const services = JSON.stringify(Array.isArray(body.services) ? body.services : []);
    const [existing] = await database.query(
      "SELECT user_id FROM professional_profiles WHERE user_id = ? LIMIT 1",
      [request.user.sub],
    );
    if (existing[0]) {
      await database.query(
        `UPDATE professional_profiles SET full_name=?,profession=?,license_number=?,licensing_body=?,
         facility=?,province=?,district=?,services=?,bio=?,status='pending',
         review_note=NULL,reviewed_by=NULL,reviewed_at=NULL WHERE user_id=?`,
        [
          body.full_name.trim(), body.profession.trim(), body.license_number.trim(),
          body.licensing_body?.trim() || null, body.facility?.trim() || null,
          body.province?.trim() || null, body.district?.trim() || null,
          services, body.bio?.trim() || null, request.user.sub,
        ],
      );
    } else {
      await database.query(
        `INSERT INTO professional_profiles
         (user_id,full_name,profession,license_number,licensing_body,facility,province,district,services,bio,status)
         VALUES (?,?,?,?,?,?,?,?,?,?, 'pending')`,
        [
          request.user.sub, body.full_name.trim(), body.profession.trim(), body.license_number.trim(),
          body.licensing_body?.trim() || null, body.facility?.trim() || null,
          body.province?.trim() || null, body.district?.trim() || null,
          services, body.bio?.trim() || null,
        ],
      );
      await database.query(
        "INSERT IGNORE INTO user_roles (user_id,role) VALUES (?, 'professional')",
        [request.user.sub],
      );
    }
    await getProfessionalProfile(request, response, next);
  } catch (error) {
    next(error);
  }
}

export async function getMyRoles(request, response, next) {
  try {
    const [rows] = await database.query("SELECT role FROM user_roles WHERE user_id = ?", [request.user.sub]);
    response.json({ success: true, data: rows.map((row) => row.role) });
  } catch (error) {
    next(error);
  }
}

export async function listGuideMessages(request, response, next) {
  try {
    const [rows] = await database.query(
      "SELECT message_id,role,message,created_at FROM guide_messages WHERE user_id=? ORDER BY created_at",
      [request.user.sub],
    );
    response.json({
      success: true,
      data: rows.map((row) => typeof row.message === "string" ? JSON.parse(row.message) : row.message),
    });
  } catch (error) {
    next(error);
  }
}

export async function clearGuideMessages(request, response, next) {
  try {
    await database.query("DELETE FROM guide_messages WHERE user_id=?", [request.user.sub]);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function saveGuideMessage(request, response, next) {
  try {
    const body = request.body ?? {};
    if (!String(body.message_id ?? "").trim()) throw new HttpError(400, "message_id is required");
    if (!["user", "assistant", "system"].includes(body.role)) throw new HttpError(400, "Invalid role");
    await database.query(
      `INSERT INTO guide_messages (user_id,message_id,role,message)
       VALUES (?,?,?,?)
       ON DUPLICATE KEY UPDATE role=VALUES(role),message=VALUES(message)`,
      [
        request.user.sub,
        body.message_id,
        body.role,
        JSON.stringify(body.message ?? {}),
      ],
    );
    response.status(204).send();
  } catch (error) {
    next(error);
  }
}

function parseServices(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try { return JSON.parse(value); } catch { return []; }
}
