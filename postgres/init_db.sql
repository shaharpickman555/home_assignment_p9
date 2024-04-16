CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending'
);

-- Insert some initial data
INSERT INTO tasks (title, description, status)
VALUES
    ('First Task', 'This is the first task description.', 'completed'),
    ('Second Task', 'This is the second task description.', 'pending')
