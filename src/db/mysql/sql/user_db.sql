CREATE TABLE IF NOT EXISTS User (
    pk          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     VARCHAR(36) UNIQUE NOT NULL,
    password    VARCHAR(60) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    high_score  INT DEFAULT 0,
    create_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Google_User (
    pk          INT AUTO_INCREMENT PRIMARY KEY,
    google_id   VARCHAR(36) UNIQUE NOT NULL,
    email       VARCHAR(255) NOT NULL,
    name        VARCHAR(255),
    high_score  INT DEFAULT 0,
    create_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);