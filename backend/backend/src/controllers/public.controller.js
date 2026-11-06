import { database } from "../db/index.js";

function parseJson(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try { return JSON.parse(value); } catch { return []; }
}

export async function listLibrary(request, response, next) {
  try {
    const publishedOnly = request.query.all !== "true";
    const sql = publishedOnly
      ? "SELECT id,title,category,kind,summary,body,published,created_at FROM library_articles WHERE published = 1 ORDER BY created_at DESC"
      : "SELECT * FROM library_articles ORDER BY created_at DESC";
    const [rows] = await database.query(sql);
    response.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
}

export async function listProviders(request, response, next) {
  try {
    const [facilities] = await database.query(
      `SELECT id,name,facility_type,province,district,town,address,phone,services
       FROM health_facilities WHERE verified = 1 ORDER BY name`,
    );
    const [professionals] = await database.query(
      `SELECT user_id,full_name,profession,facility,province,district,services
       FROM professional_profiles WHERE status = 'approved' ORDER BY full_name`,
    );
    response.json({
      success: true,
      data: {
        facilities: facilities.map((row) => ({ ...row, services: parseJson(row.services) })),
        professionals: professionals.map((row) => ({ ...row, services: parseJson(row.services) })),
      },
    });
  } catch (error) {
    next(error);
  }
}
