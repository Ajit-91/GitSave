 CREATE TABLE IF NOT EXISTS repos (
    id BIGINT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    html_url VARCHAR(255) NOT NULL,
    description TEXT,
    created_at VARCHAR(255) NOT NULL,
    open_issues INTEGER NOT NULL,
    watchers INTEGER NOT NULL,
    owner JSONB NOT NULL
  );
