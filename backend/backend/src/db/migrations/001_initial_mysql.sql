USE `painease`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `guide_messages`;
DROP TABLE IF EXISTS `pain_entries`;
DROP TABLE IF EXISTS `user_roles`;
DROP TABLE IF EXISTS `professional_profiles`;
DROP TABLE IF EXISTS `profiles`;
DROP TABLE IF EXISTS `audit_logs`;
DROP TABLE IF EXISTS `library_articles`;
DROP TABLE IF EXISTS `health_facilities`;
DROP TABLE IF EXISTS `password_reset_tokens`;
DROP TABLE IF EXISTS `auth_sessions`;
DROP TABLE IF EXISTS `users`;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `users` (
  `id` CHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NULL,
  `full_name` VARCHAR(255) NULL,
  `avatar_url` VARCHAR(2048) NULL,
  `email_verified_at` DATETIME NULL,
  `provider` VARCHAR(50) NOT NULL DEFAULT 'email',
  `provider_id` VARCHAR(255) NULL,
  `last_login_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_email` (`email`),
  UNIQUE KEY `uk_users_provider` (`provider`, `provider_id`),
  KEY `idx_users_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `auth_sessions` (
  `id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `refresh_token_hash` CHAR(64) NOT NULL,
  `user_agent` VARCHAR(500) NULL,
  `ip_address` VARCHAR(45) NULL,
  `expires_at` DATETIME NOT NULL,
  `revoked_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_auth_sessions_refresh_token` (`refresh_token_hash`),
  KEY `idx_auth_sessions_user_id` (`user_id`),
  KEY `idx_auth_sessions_expires_at` (`expires_at`),
  CONSTRAINT `fk_auth_sessions_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `password_reset_tokens` (
  `id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `token_hash` CHAR(64) NOT NULL,
  `expires_at` DATETIME NOT NULL,
  `used_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_password_reset_token_hash` (`token_hash`),
  KEY `idx_password_reset_user_id` (`user_id`),
  KEY `idx_password_reset_expires_at` (`expires_at`),
  CONSTRAINT `fk_password_reset_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_roles` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` CHAR(36) NOT NULL,
  `role` ENUM('admin', 'professional', 'user') NOT NULL DEFAULT 'user',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_roles_user_role` (`user_id`, `role`),
  KEY `idx_user_roles_role` (`role`),
  CONSTRAINT `fk_user_roles_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `profiles` (
  `id` CHAR(36) NOT NULL,
  `full_name` VARCHAR(255) NULL,
  `phone` VARCHAR(50) NULL,
  `date_of_birth` DATE NULL,
  `province` VARCHAR(100) NULL,
  `district` VARCHAR(100) NULL,
  `town` VARCHAR(100) NULL,
  `goals` TEXT NULL,
  `theme` VARCHAR(30) NOT NULL DEFAULT 'light',
  `cycle_tracking` BOOLEAN NOT NULL DEFAULT FALSE,
  `pain_locations` JSON NOT NULL,
  `conditions` JSON NOT NULL,
  `symptoms` JSON NOT NULL,
  `therapy_preferences` JSON NOT NULL,
  `notify_checkin` BOOLEAN NOT NULL DEFAULT FALSE,
  `notify_weekly` BOOLEAN NOT NULL DEFAULT FALSE,
  `consent_ai_insights` BOOLEAN NOT NULL DEFAULT FALSE,
  `consent_research` BOOLEAN NOT NULL DEFAULT FALSE,
  `consent_share_providers` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_profiles_user`
    FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `pain_entries` (
  `id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `recorded_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `regions` JSON NOT NULL,
  `max_intensity` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `mood` VARCHAR(50) NULL,
  `sleep_hours` DECIMAL(4,2) NULL,
  `notes` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_pain_entries_user_recorded` (`user_id`, `recorded_at` DESC),
  CONSTRAINT `fk_pain_entries_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chk_pain_entries_intensity`
    CHECK (`max_intensity` BETWEEN 0 AND 10),
  CONSTRAINT `chk_pain_entries_sleep`
    CHECK (`sleep_hours` IS NULL OR (`sleep_hours` >= 0 AND `sleep_hours` <= 24))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `guide_messages` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` CHAR(36) NOT NULL,
  `message_id` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'assistant', 'system') NOT NULL,
  `message` JSON NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_guide_messages_user_message` (`user_id`, `message_id`),
  KEY `idx_guide_messages_user_created` (`user_id`, `created_at` DESC),
  CONSTRAINT `fk_guide_messages_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `professional_profiles` (
  `user_id` CHAR(36) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `profession` VARCHAR(150) NOT NULL,
  `license_number` VARCHAR(100) NOT NULL,
  `licensing_body` VARCHAR(150) NULL,
  `facility` VARCHAR(255) NULL,
  `province` VARCHAR(100) NULL,
  `district` VARCHAR(100) NULL,
  `bio` TEXT NULL,
  `services` JSON NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `review_note` TEXT NULL,
  `reviewed_by` CHAR(36) NULL,
  `reviewed_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uk_professional_license` (`licensing_body`, `license_number`),
  KEY `idx_professional_status` (`status`),
  KEY `idx_professional_location` (`province`, `district`),
  CONSTRAINT `fk_professional_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_professional_reviewer`
    FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `health_facilities` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `facility_type` VARCHAR(100) NOT NULL,
  `province` VARCHAR(100) NULL,
  `district` VARCHAR(100) NULL,
  `town` VARCHAR(100) NULL,
  `address` VARCHAR(255) NULL,
  `phone` VARCHAR(50) NULL,
  `services` JSON NOT NULL,
  `verified` BOOLEAN NOT NULL DEFAULT FALSE,
  `verified_by` CHAR(36) NULL,
  `verified_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_health_facilities_verified` (`verified`),
  KEY `idx_health_facilities_location` (`province`, `district`),
  CONSTRAINT `fk_health_facility_verifier`
    FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `library_articles` (
  `id` CHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'General',
  `kind` VARCHAR(100) NOT NULL DEFAULT 'article',
  `summary` VARCHAR(500) NULL,
  `body` LONGTEXT NOT NULL,
  `published` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_by` CHAR(36) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_library_published` (`published`, `created_at` DESC),
  KEY `idx_library_category` (`category`),
  FULLTEXT KEY `ft_library_search` (`title`, `summary`, `body`),
  CONSTRAINT `fk_library_creator`
    FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `audit_logs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `actor_id` CHAR(36) NULL,
  `action` VARCHAR(150) NOT NULL,
  `target` VARCHAR(255) NULL,
  `details` JSON NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_audit_logs_actor_created` (`actor_id`, `created_at` DESC),
  KEY `idx_audit_logs_action` (`action`),
  CONSTRAINT `fk_audit_actor`
    FOREIGN KEY (`actor_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
