-- POCKETTOOLS - Optimized Script for MariaDB 10.7+

CREATE DATABASE IF NOT EXISTS pockettools;
USE pockettools;

-- Tables
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT UUID(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE settings (
    user_id UUID PRIMARY KEY,
    global_theme VARCHAR(20) DEFAULT 'dark',
    last_active_tool VARCHAR(30),
    CONSTRAINT fk_settings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE tool_themes (
    user_id UUID,
    tool_id VARCHAR(30) NOT NULL,
    theme_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_id, tool_id),
    CONSTRAINT fk_tool_themes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE notes (
    user_id UUID PRIMARY KEY,
    content TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_notes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE todos (
    id UUID PRIMARY KEY DEFAULT UUID(),
    user_id UUID,
    text VARCHAR(255) NOT NULL,
    is_done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_todos_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT UUID(),
    user_id UUID,
    text VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE tasks_history (
    task_id UUID,
    date DATE NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (task_id, date),
    CONSTRAINT fk_history_task FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE expense_sources (
    id UUID PRIMARY KEY DEFAULT UUID(),
    user_id UUID,
    name VARCHAR(50) NOT NULL,
    CONSTRAINT fk_sources_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT UUID(),
    user_id UUID,
    source_id UUID,
    concept VARCHAR(100) NOT NULL,
    value DECIMAL(12, 2) NOT NULL,
    timestamp BIGINT NOT NULL,
    simple_date DATE NOT NULL,
    cierre_at DATETIME,
    CONSTRAINT fk_expenses_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_expenses_source FOREIGN KEY (source_id) REFERENCES expense_sources(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE fuel_logs (
    id UUID PRIMARY KEY DEFAULT UUID(),
    user_id UUID,
    date DATETIME NOT NULL,
    dist_km DECIMAL(10, 2),
    gallons DECIMAL(10, 3),
    cost DECIMAL(10, 2),
    type ENUM('log', 'reset') NOT NULL,
    total_cost_period DECIMAL(12, 2),
    CONSTRAINT fk_fuel_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE shopping_nodes (
    id UUID PRIMARY KEY DEFAULT UUID(),
    user_id UUID,
    parent_id UUID,
    type ENUM('list', 'item') NOT NULL,
    title VARCHAR(100) NOT NULL,
    color VARCHAR(20),
    is_expanded BOOLEAN DEFAULT TRUE,
    is_checked BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    CONSTRAINT fk_shopping_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_shopping_parent FOREIGN KEY (parent_id) REFERENCES shopping_nodes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE milestones (
    id UUID PRIMARY KEY DEFAULT UUID(),
    user_id UUID,
    type VARCHAR(20),
    event_date DATE NOT NULL,
    description TEXT,
    count INT DEFAULT 0,
    is_locked BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    CONSTRAINT fk_milestones_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE guided_notes (
    id UUID PRIMARY KEY DEFAULT UUID(),
    user_id UUID,
    title VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    CONSTRAINT fk_guided_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE guided_items (
    id UUID PRIMARY KEY DEFAULT UUID(),
    note_id UUID,
    text TEXT NOT NULL,
    CONSTRAINT fk_guided_items_note FOREIGN KEY (note_id) REFERENCES guided_notes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE tracker_sites (
    id UUID PRIMARY KEY DEFAULT UUID(),
    user_id UUID,
    name VARCHAR(100) NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_tracker_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE tracker_persons (
    id UUID PRIMARY KEY DEFAULT UUID(),
    site_id UUID,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    CONSTRAINT fk_tracker_persons_site FOREIGN KEY (site_id) REFERENCES tracker_sites(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE cycle_tracking (
    user_id UUID PRIMARY KEY,
    last_start_date DATE NOT NULL,
    CONSTRAINT fk_cycle_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Optimized Indices
CREATE INDEX idx_expenses_perf ON expenses(user_id, simple_date);
CREATE INDEX idx_todos_perf ON todos(user_id, is_done);
