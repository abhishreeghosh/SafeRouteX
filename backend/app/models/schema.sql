CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS crime_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  severity INTEGER NOT NULL CHECK (severity BETWEEN 0 AND 100),
  description TEXT,
  occurred_at TIMESTAMPTZ NOT NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  district TEXT,
  source TEXT NOT NULL DEFAULT 'open_data'
);

CREATE TABLE IF NOT EXISTS user_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  category TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  reliability_score NUMERIC(4, 2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS route_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  origin GEOGRAPHY(POINT, 4326) NOT NULL,
  destination GEOGRAPHY(POINT, 4326) NOT NULL,
  risk_score INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_prediction_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_version TEXT NOT NULL,
  horizon_hours INTEGER NOT NULL,
  risk_score INTEGER NOT NULL,
  confidence NUMERIC(4, 2) NOT NULL,
  district TEXT,
  geometry GEOGRAPHY(POLYGON, 4326),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS crime_incidents_location_idx ON crime_incidents USING GIST (location);
CREATE INDEX IF NOT EXISTS user_reports_location_idx ON user_reports USING GIST (location);
CREATE INDEX IF NOT EXISTS ai_prediction_outputs_geometry_idx ON ai_prediction_outputs USING GIST (geometry);
