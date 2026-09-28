USE festra_db;

ALTER TABLE users
    MODIFY role ENUM('participant', 'organizer', 'admin') DEFAULT 'participant';

ALTER TABLE events
    ADD COLUMN category VARCHAR(100) NULL AFTER description,
    ADD COLUMN venue VARCHAR(255) NULL AFTER category,
    ADD COLUMN start_time TIME NULL AFTER event_date,
    ADD COLUMN end_time TIME NULL AFTER start_time,
    ADD COLUMN capacity INT UNSIGNED NULL AFTER end_time,
    ADD COLUMN registration_fee DECIMAL(10, 2) NOT NULL DEFAULT 0 AFTER capacity,
    ADD COLUMN banner_url VARCHAR(2048) NULL AFTER registration_fee,
    ADD COLUMN status ENUM('draft', 'published', 'ongoing', 'completed') NOT NULL DEFAULT 'draft' AFTER banner_url,
    ADD COLUMN created_by INT NULL AFTER organizer_id,
    ADD COLUMN archived_at TIMESTAMP NULL DEFAULT NULL,
    ADD CONSTRAINT fk_events_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE;

UPDATE events
SET created_by = organizer_id,
    venue = COALESCE(venue, location),
    start_time = COALESCE(start_time, event_time)
WHERE created_by IS NULL OR venue IS NULL OR start_time IS NULL;

ALTER TABLE registrations
    ADD COLUMN ticket_token VARCHAR(64) NULL,
    ADD COLUMN team_name VARCHAR(255) NULL,
    ADD COLUMN team_members JSON NULL,
    ADD COLUMN payment_status ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
    ADD UNIQUE INDEX uq_registrations_ticket_token (ticket_token);

CREATE TABLE event_speakers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NULL,
    bio TEXT NULL,
    photo_url VARCHAR(2048) NULL,
    sort_order INT NOT NULL DEFAULT 0,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE event_agenda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    start_time TIME NULL,
    end_time TIME NULL,
    sort_order INT NOT NULL DEFAULT 0,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);