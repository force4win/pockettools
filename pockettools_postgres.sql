-- POCKETTOOLS - Optimized Script for PostgreSQL

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define Custom Types
CREATE TYPE fuel_log_type AS ENUM ('log', 'reset');
CREATE TYPE shopping_node_type AS ENUM ('list', 'item');

-- Tables
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    global_theme VARCHAR(20) DEFAULT 'dark',
    last_active_tool VARCHAR(30)
);

CREATE TABLE tool_themes (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tool_id VARCHAR(30) NOT NULL,
    theme_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_id, tool_id)
);

CREATE TABLE notes (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    text VARCHAR(255) NOT NULL,
    is_done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    text VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0
);

CREATE TABLE tasks_history (
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (task_id, date)
);

CREATE TABLE expense_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    source_id UUID REFERENCES expense_sources(id) ON DELETE SET NULL,
    concept VARCHAR(100) NOT NULL,
    value DECIMAL(12, 2) NOT NULL,
    timestamp BIGINT NOT NULL,
    simple_date DATE NOT NULL,
    cierre_at TIMESTAMPTZ
);

CREATE TABLE fuel_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date TIMESTAMPTZ NOT NULL,
    dist_km DECIMAL(10, 2),
    gallons DECIMAL(10, 3),
    cost DECIMAL(10, 2),
    type fuel_log_type NOT NULL,
    total_cost_period DECIMAL(12, 2)
);

CREATE TABLE shopping_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES shopping_nodes(id) ON DELETE CASCADE,
    type shopping_node_type NOT NULL,
    title VARCHAR(100) NOT NULL,
    color VARCHAR(20),
    is_expanded BOOLEAN DEFAULT TRUE,
    is_checked BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0
);

CREATE TABLE milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20),
    event_date DATE NOT NULL,
    description TEXT,
    count INT DEFAULT 0,
    is_locked BOOLEAN DEFAULT FALSE,
    image_url TEXT
);

CREATE TABLE guided_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

CREATE TABLE guided_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    note_id UUID REFERENCES guided_notes(id) ON DELETE CASCADE,
    text TEXT NOT NULL
);

CREATE TABLE tracker_sites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE
);

CREATE TABLE tracker_persons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES tracker_sites(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE cycle_tracking (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    last_start_date DATE NOT NULL
);

-- Indices for performance
CREATE INDEX idx_expenses_user_date ON expenses(user_id, simple_date);
CREATE INDEX idx_todos_user_done ON todos(user_id, is_done);
CREATE INDEX idx_shopping_parent ON shopping_nodes(parent_id);
