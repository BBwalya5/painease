import crypto from "node:crypto";
import { database } from "../db/index.js";
import { HttpError } from "../utils/httpError.js";

export async function stats(_request, response, next) {
  try {
    const [rows] = await database.query(`
      SELECT
        (SELECT COUNT(*) FROM users) users,
        (SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL 7 DAY) users_7d,
        (SELECT COUNT(*) FROM users WHERE last_login_at >= NOW() - INTERVAL 7 DAY) active_7d,
        (SELECT COUNT(*) FROM pain_entries) entries,
        (SELECT COUNT(*) FROM pain_entries WHERE created_at >= NOW() - INTERVAL 7 DAY) entries_7d,
        (SELECT COUNT(*) FROM guide_messages) guide_messages,
        (SELECT COUNT(*) FROM guide_messages WHERE created_at >= NOW() - INTERVAL 7 DAY) guide_messages_7d,
        (SELECT COUNT(*) FROM professional_profiles WHERE status='approved') professionals_approved,
        (SELECT COUNT(*) FROM professional_profiles WHERE status='pending') professionals_pending,
        (SELECT COUNT(*) FROM library_articles WHERE published=1) articles_published,
        (SELECT COUNT(*) FROM library_articles WHERE published=0) articles_draft,
        (SELECT COUNT(*) FROM health_facilities WHERE verified=1) facilities_verified,
        (SELECT COUNT(*) FROM health_facilities WHERE verified=0) facilities_unverified,
        (SELECT COUNT(*) FROM user_roles WHERE role='admin') admins
    `);
    response.json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
}

export async function listUsers(_request, response, next) {
  try {
    const [rows] = await database.query(`
      SELECT u.id,u.email,u.full_name,u.created_at,u.last_login_at,
             COUNT(DISTINCT p.id) entry_count,
             COALESCE(GROUP_CONCAT(DISTINCT ur.role ORDER BY ur.role SEPARATOR ','),'user') role_csv
      FROM users u
      LEFT JOIN pain_entries p ON p.user_id=u.id
      LEFT JOIN user_roles ur ON ur.user_id=u.id
      GROUP BY u.id,u.email,u.full_name,u.created_at,u.last_login_at
      ORDER BY u.created_at DESC
    `);
    response.json({
      success: true,
      data: rows.map((row) => ({
        ...row,
        roles: row.role_csv ? row.role_csv.split(",").filter(Boolean) : ["user"],
      })),
    });
  } catch (error) {
    next(error);
  }
}

export async function setRole(request, response, next) {
  try {
    const role = request.body.role;
    if (!["admin", "professional", "user"].includes(role)) throw new HttpError(400, "Invalid role");
    if (request.body.grant) {
      await database.query("INSERT IGNORE INTO user_roles (user_id,role) VALUES (?,?)", [request.params.userId, role]);
    } else {
      await database.query("DELETE FROM user_roles WHERE user_id=? AND role=?", [request.params.userId, role]);
    }
    await database.query(
      "INSERT INTO audit_logs (actor_id,action,target,details) VALUES (?,?,?,?)",
      [
        request.user.sub,
        request.body.grant ? "role.grant" : "role.revoke",
        request.params.userId,
        JSON.stringify({ role }),
      ],
    );
    response.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function listProfessionals(_request, response, next) {
    try {
      const [rows] = await database.query("SELECT * FROM professional_profiles ORDER BY created_at DESC");
      response.json({
        success: true,
        data: rows.map((row) => ({
          ...row,
          services: parseJson(row.services),
        })),
      });
    } catch (error) {
      next(error);
    }
  }

export async function reviewProfessional(request, response, next) {
    try {
      const approved = Boolean(request.body.approved);
      await database.query(
        `UPDATE professional_profiles
         SET status=?,review_note=?,reviewed_by=?,reviewed_at=CURRENT_TIMESTAMP
         WHERE user_id=?`,
        [
          approved ? "approved" : "rejected",
          request.body.note?.trim() || null,
          request.user.sub,
          request.params.userId,
        ],
      );
      if (approved) {
        await database.query(
          "INSERT IGNORE INTO user_roles (user_id,role) VALUES (?, 'professional')",
          [request.params.userId],
        );
      }
      await database.query(
        "INSERT INTO audit_logs (actor_id,action,target,details) VALUES (?,?,?,?)",
        [
          request.user.sub,
          approved ? "professional.approve" : "professional.reject",
          request.params.userId,
          JSON.stringify({ note: request.body.note?.trim() || null }),
        ],
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

export async function listArticles(_request, response, next) {
    try {
      const [rows] = await database.query("SELECT * FROM library_articles ORDER BY created_at DESC");
      response.json({ success: true, data: rows });
    } catch (error) {
      next(error);
    }
  }

export async function createArticle(request, response, next) {
    try {
      const body = request.body ?? {};
      if (!String(body.title ?? "").trim() || !String(body.body ?? "").trim()) {
        throw new HttpError(400, "Add a title and article text");
      }
      const id = crypto.randomUUID();
      await database.query(
        `INSERT INTO library_articles
         (id,title,category,kind,summary,body,published,created_by)
         VALUES (?,?,?,?,?,?,0,?)`,
        [
          id,
          body.title.trim(),
          body.category?.trim() || "General",
          body.kind?.trim() || "Article",
          body.summary?.trim() || null,
          body.body,
          request.user.sub,
        ],
      );
      response.status(201).json({ success: true, data: { id } });
    } catch (error) {
      next(error);
    }
  }

export async function updateArticle(request, response, next) {
    try {
      await database.query(
        "UPDATE library_articles SET published=? WHERE id=?",
        [Boolean(request.body.published), request.params.id],
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

export async function deleteArticle(request, response, next) {
    try {
      await database.query("DELETE FROM library_articles WHERE id=?", [request.params.id]);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

export async function listFacilities(_request, response, next) {
    try {
      const [rows] = await database.query("SELECT * FROM health_facilities ORDER BY name");
      response.json({
        success: true,
        data: rows.map((row) => ({ ...row, services: parseJson(row.services) })),
      });
    } catch (error) {
      next(error);
    }
  }

export async function createFacility(request, response, next) {
    try {
      const body = request.body ?? {};
      if (!String(body.name ?? "").trim()) throw new HttpError(400, "Add the facility name");
      const id = crypto.randomUUID();
      await database.query(
        `INSERT INTO health_facilities
         (id,name,facility_type,province,district,town,address,phone,services,verified)
         VALUES (?,?,?,?,?,?,?,?,?,0)`,
        [
          id,
          body.name.trim(),
          body.facility_type?.trim() || "Health centre",
          body.province || null,
          body.district?.trim() || null,
          body.town?.trim() || null,
          body.address?.trim() || null,
          body.phone?.trim() || null,
          JSON.stringify(body.services ?? []),
        ],
      );
      response.status(201).json({ success: true, data: { id } });
    } catch (error) {
      next(error);
    }
  }

export async function verifyFacility(request, response, next) {
    try {
      const verified = Boolean(request.body.verified);
      await database.query(
        `UPDATE health_facilities SET verified=?,verified_by=?,verified_at=?
         WHERE id=?`,
        [
          verified,
          verified ? request.user.sub : null,
          verified ? new Date() : null,
          request.params.id,
        ],
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

export async function listAudit(_request, response, next) {
    try {
      const [rows] = await database.query(
        `SELECT a.*,u.email,u.full_name
         FROM audit_logs a
         LEFT JOIN users u ON u.id=a.actor_id
         ORDER BY a.created_at DESC LIMIT 200`,
      );
      response.json({
        success: true,
        data: rows.map((row) => ({
          ...row,
          details: parseJson(row.details),
        })),
      });
    } catch (error) {
      next(error);
    }
  }

function parseJson(value) {
    if (!value) return [];
    if (Array.isArray(value) || typeof value === "object") return value;
    try { return JSON.parse(value); } catch { return []; }
}
