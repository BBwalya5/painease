import { database } from "../db/index.js";
import { HttpError } from "../utils/httpError.js";

function jsonArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function getProfile(request, response, next) {
  try {
    const [rows] = await database.query("SELECT * FROM profiles WHERE id = ? LIMIT 1", [request.user.sub]);
    if (!rows[0]) throw new HttpError(404, "Profile not found");
    const profile = rows[0];
    for (const field of ["pain_locations", "conditions", "symptoms", "therapy_preferences"]) {
      profile[field] = jsonArray(profile[field]);
    }
    response.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(request, response, next) {
  try {
    const body = request.body ?? {};
    await database.query(
      `INSERT INTO profiles
       (id,full_name,phone,date_of_birth,province,district,town,goals,theme,cycle_tracking,
        pain_locations,conditions,symptoms,therapy_preferences,notify_checkin,notify_weekly,
        consent_ai_insights,consent_research,consent_share_providers)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
       ON DUPLICATE KEY UPDATE
       full_name=VALUES(full_name),phone=VALUES(phone),date_of_birth=VALUES(date_of_birth),
       province=VALUES(province),district=VALUES(district),town=VALUES(town),goals=VALUES(goals),
       theme=VALUES(theme),cycle_tracking=VALUES(cycle_tracking),pain_locations=VALUES(pain_locations),
       conditions=VALUES(conditions),symptoms=VALUES(symptoms),therapy_preferences=VALUES(therapy_preferences),
       notify_checkin=VALUES(notify_checkin),notify_weekly=VALUES(notify_weekly),
       consent_ai_insights=VALUES(consent_ai_insights),consent_research=VALUES(consent_research),
       consent_share_providers=VALUES(consent_share_providers)`,
      [
        request.user.sub,
        body.full_name ?? null,
        body.phone ?? null,
        body.date_of_birth || null,
        body.province || null,
        body.district || null,
        body.town || null,
        body.goals ?? null,
        body.theme ?? "light",
        Boolean(body.cycle_tracking),
        JSON.stringify(body.pain_locations ?? []),
        JSON.stringify(body.conditions ?? []),
        JSON.stringify(body.symptoms ?? []),
        JSON.stringify(body.therapy_preferences ?? []),
        Boolean(body.notify_checkin),
        Boolean(body.notify_weekly),
        Boolean(body.consent_ai_insights),
        Boolean(body.consent_research),
        Boolean(body.consent_share_providers),
      ],
    );
    await getProfile(request, response, next);
  } catch (error) {
    next(error);
  }
}
