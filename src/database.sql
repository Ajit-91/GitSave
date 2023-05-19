
CREATE TABLE IF NOT EXISTS repos (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  html_url VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at VARCHAR(255) NOT NULL,
  open_issues INTEGER NOT NULL,
  watchers INTEGER NOT NULL,
  owner_id VARCHAR(255) NOT NULL,
  owner_avatar_url VARCHAR(255) NOT NULL,
  owner_html_url VARCHAR(255) NOT NULL,
  owner_type VARCHAR(255) NOT NULL,
  owner_site_admin BOOLEAN NOT NULL
);
