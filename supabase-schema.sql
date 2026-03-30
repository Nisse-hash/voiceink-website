-- VoiceInk database schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/xctivlkiknuogmffercl/sql

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  image_url TEXT,
  pro BOOLEAN DEFAULT FALSE,
  stripe_session_id TEXT,
  paid_at TIMESTAMPTZ,
  settings JSONB DEFAULT '{}',
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS usage (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  model TEXT NOT NULL,
  language TEXT NOT NULL,
  word_count INTEGER DEFAULT 0,
  duration_ms INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_usage_user_date ON usage (user_id, created_at);
