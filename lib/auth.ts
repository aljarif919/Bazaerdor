import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const database = new Database(process.env.DATABASE_URL || "./bazardor.db");
// Create Better Auth's required SQLite tables automatically so email/password
// authentication works on a fresh local install without a separate migration step.
database.exec(`
  CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    emailVerified INTEGER NOT NULL DEFAULT 0,
    image TEXT,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY NOT NULL,
    expiresAt INTEGER NOT NULL,
    token TEXT NOT NULL UNIQUE,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    ipAddress TEXT,
    userAgent TEXT,
    userId TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS session_userId_idx ON session(userId);
  CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY NOT NULL,
    accountId TEXT NOT NULL,
    providerId TEXT NOT NULL,
    userId TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    accessToken TEXT,
    refreshToken TEXT,
    idToken TEXT,
    accessTokenExpiresAt INTEGER,
    refreshTokenExpiresAt INTEGER,
    scope TEXT,
    password TEXT,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS account_userId_idx ON account(userId);
  CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY NOT NULL,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    expiresAt INTEGER NOT NULL,
    createdAt INTEGER,
    updatedAt INTEGER
  );
`);
export const auth = betterAuth({
  database,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "development-only-change-this-secret-before-deploying-123456",
  emailAndPassword: { enabled: true },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
      google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }
    } : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? {
      github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET }
    } : {})
  },
  user: {
    additionalFields: {}
  }
});