CREATE TABLE IF NOT EXISTS
user_comments(
        id uuid DEFAULT uuid_generate_v4 (),
        user_name VARCHAR(128) NOT NULL,
        user_id uuid NOT NULL,
        movie_id INT,
        comment VARCHAR(128) NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL,
        PRIMARY KEY(id)
);