 CREATE TABLE IF NOT EXISTS repositories (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    html_url VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created_at VARCHAR(255) NOT NULL,
    open_issues INTEGER NOT NULL,
    watchers INTEGER NOT NULL,
    owner JSONB NOT NULL
  );
