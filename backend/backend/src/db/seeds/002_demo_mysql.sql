INSERT INTO users
  (id,email,password_hash,full_name,email_verified_at,provider,last_login_at)
VALUES
  ('10000000-0000-4000-8000-000000000001','admin@painease.test','$2b$12$wzllSqYGbb8FQs8HnCumZO.H3nGM.tN4f3JRTbGA7CoMvU5e5XHg2','PainEase Admin',CURRENT_TIMESTAMP,'email',CURRENT_TIMESTAMP),
  ('10000000-0000-4000-8000-000000000002','professional@painease.test','$2b$12$oAkNmaCgtN/cA6R0a76Uu..Ipt4GjAxU1QAlhfJIZqAPwok/brfbq','Mwaka Banda',CURRENT_TIMESTAMP,'email',CURRENT_TIMESTAMP),
  ('10000000-0000-4000-8000-000000000003','user@painease.test','$2b$12$k7UkCHnQK/eVZnOhiSxzF.NG9Wb5CEFVtDceqSs.dcmKGPQzwMHOS','Chipo Mwale',CURRENT_TIMESTAMP,'email',CURRENT_TIMESTAMP)
ON DUPLICATE KEY UPDATE
  email=VALUES(email),
  password_hash=VALUES(password_hash),
  full_name=VALUES(full_name),
  email_verified_at=VALUES(email_verified_at),
  updated_at=CURRENT_TIMESTAMP;

INSERT IGNORE INTO user_roles (user_id,role) VALUES
  ('10000000-0000-4000-8000-000000000001','user'),
  ('10000000-0000-4000-8000-000000000001','admin'),
  ('10000000-0000-4000-8000-000000000002','user'),
  ('10000000-0000-4000-8000-000000000002','professional'),
  ('10000000-0000-4000-8000-000000000003','user');

INSERT INTO profiles
  (id,full_name,phone,date_of_birth,province,district,town,goals,theme,cycle_tracking,
   pain_locations,conditions,symptoms,therapy_preferences,notify_checkin,notify_weekly,
   consent_ai_insights,consent_research,consent_share_providers)
VALUES
  ('10000000-0000-4000-8000-000000000001','PainEase Admin','',NULL,'Lusaka','Lusaka','Lusaka','Administer and maintain the demo application','light',FALSE,'[]','[]','[]','[]',FALSE,FALSE,TRUE,FALSE,FALSE),
  ('10000000-0000-4000-8000-000000000002','Mwaka Banda','+260 970 000 002','1990-06-15','Lusaka','Lusaka','Lusaka','Support women with practical health guidance','light',FALSE,'["lower-back"]','[]','["back pain"]','["physiotherapy"]',TRUE,TRUE,TRUE,FALSE,FALSE),
  ('10000000-0000-4000-8000-000000000003','Chipo Mwale','+260 970 000 003','1998-03-20','Lusaka','Lusaka','Lusaka','Track pain patterns and improve my wellbeing','light',TRUE,'["lower-belly:left","lower-belly:right"]','["Dysmenorrhea"]','["cramps","bloating"]','["heat therapy","gentle exercise"]',TRUE,TRUE,FALSE,FALSE,FALSE)
ON DUPLICATE KEY UPDATE
  full_name=VALUES(full_name),
  phone=VALUES(phone),
  date_of_birth=VALUES(date_of_birth),
  province=VALUES(province),
  district=VALUES(district),
  town=VALUES(town),
  goals=VALUES(goals),
  theme=VALUES(theme),
  cycle_tracking=VALUES(cycle_tracking),
  pain_locations=VALUES(pain_locations),
  conditions=VALUES(conditions),
  symptoms=VALUES(symptoms),
  therapy_preferences=VALUES(therapy_preferences),
  notify_checkin=VALUES(notify_checkin),
  notify_weekly=VALUES(notify_weekly),
  consent_ai_insights=VALUES(consent_ai_insights),
  consent_research=VALUES(consent_research),
  consent_share_providers=VALUES(consent_share_providers);

INSERT INTO professional_profiles
  (user_id,full_name,profession,license_number,licensing_body,facility,province,district,bio,services,status,reviewed_by,reviewed_at)
VALUES
  ('10000000-0000-4000-8000-000000000002','Mwaka Banda','Physiotherapist','DEMO-PT-001','Health Professions Council of Zambia','Lusaka Health Centre','Lusaka','Lusaka','Demo professional profile providing general physiotherapy and womens health support.', '["Physiotherapy","Women''s health","Chronic condition support"]','approved','10000000-0000-4000-8000-000000000001',CURRENT_TIMESTAMP)
ON DUPLICATE KEY UPDATE
  full_name=VALUES(full_name),
  profession=VALUES(profession),
  license_number=VALUES(license_number),
  licensing_body=VALUES(licensing_body),
  facility=VALUES(facility),
  province=VALUES(province),
  district=VALUES(district),
  bio=VALUES(bio),
  services=VALUES(services),
  status='approved',
  reviewed_by=VALUES(reviewed_by),
  reviewed_at=VALUES(reviewed_at);

INSERT INTO library_articles
  (id,title,category,kind,summary,body,published,created_by)
VALUES
  ('20000000-0000-4000-8000-000000000001','Understanding menstrual pain','Menstrual health','Article','Learn the difference between common period pain and symptoms that need medical attention.','Menstrual pain is common, but severe pain should not be ignored. Rest, gentle movement, warmth and hydration may help. Seek urgent medical care if pain is sudden or severe, bleeding is heavy, or pain occurs during pregnancy.',TRUE,'10000000-0000-4000-8000-000000000001'),
  ('20000000-0000-4000-8000-000000000002','Gentle lower-back stretches','Exercise','Exercise','A short, gentle routine for everyday lower-back discomfort.','Start slowly and stop if movement increases pain. Try gentle pelvic tilts, supported knee-to-chest stretches and slow walking. Ask a healthcare professional before exercising if you have an injury or a medical condition.',TRUE,'10000000-0000-4000-8000-000000000001'),
  ('20000000-0000-4000-8000-000000000003','When should you seek care?','General','Article','Common danger signs that mean you should visit a clinic or hospital.','Seek help now for severe or sudden pain, fainting, heavy bleeding, fever with pain, chest pain, trouble breathing, pain in pregnancy, or pain after injury. Ease Guide information is general and does not replace medical care.',FALSE,'10000000-0000-4000-8000-000000000001')
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  category=VALUES(category),
  kind=VALUES(kind),
  summary=VALUES(summary),
  body=VALUES(body),
  published=VALUES(published),
  updated_at=CURRENT_TIMESTAMP;

INSERT INTO health_facilities
  (id,name,facility_type,province,district,town,address,phone,services,verified,verified_by,verified_at)
VALUES
  ('30000000-0000-4000-8000-000000000001','Lusaka Health Centre','Health centre','Lusaka','Lusaka','Lusaka','Demo address, Lusaka','+260 211 000 001','["General consultation","Women health"]',TRUE,'10000000-0000-4000-8000-000000000001',CURRENT_TIMESTAMP),
  ('30000000-0000-4000-8000-000000000002','Copperbelt Clinic','Clinic','Copperbelt','Ndola','Ndola','Demo address, Ndola','+260 212 000 002','["General consultation","Physiotherapy"]',FALSE,NULL,NULL)
ON DUPLICATE KEY UPDATE
  name=VALUES(name),
  facility_type=VALUES(facility_type),
  province=VALUES(province),
  district=VALUES(district),
  town=VALUES(town),
  address=VALUES(address),
  phone=VALUES(phone),
  services=VALUES(services),
  verified=VALUES(verified),
  verified_by=VALUES(verified_by),
  verified_at=VALUES(verified_at),
  updated_at=CURRENT_TIMESTAMP;

INSERT INTO pain_entries
  (id,user_id,recorded_at,regions,max_intensity,mood,sleep_hours,notes)
VALUES
  ('40000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000003','2026-10-28 08:00:00','["lower-belly:left","lower-belly:right"]',5,'tired',7.5,'Cramping was manageable with warmth and rest.'),
  ('40000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000003','2026-11-01 08:30:00','["lower-back:right"]',3,'okay',8.0,'Mild back pain after sitting for a long time.')
ON DUPLICATE KEY UPDATE
  recorded_at=VALUES(recorded_at),
  regions=VALUES(regions),
  max_intensity=VALUES(max_intensity),
  mood=VALUES(mood),
  sleep_hours=VALUES(sleep_hours),
  notes=VALUES(notes),
  updated_at=CURRENT_TIMESTAMP;
