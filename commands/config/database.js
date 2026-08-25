const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'bot_data.db'));

// ---- TABLES ----
db.exec(`
  CREATE TABLE IF NOT EXISTS afk (
    user_id TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    reason TEXT DEFAULT 'AFK',
    timestamp INTEGER NOT NULL,
    mentions INTEGER DEFAULT 0,
    PRIMARY KEY (user_id, guild_id)
  );

  CREATE TABLE IF NOT EXISTS warnings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    moderator_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  CREATE TABLE IF NOT EXISTS kicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    moderator_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  CREATE TABLE IF NOT EXISTS bans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    moderator_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  CREATE TABLE IF NOT EXISTS mutes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    moderator_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    duration_minutes INTEGER,
    expires_at INTEGER,
    created_at INTEGER DEFAULT (strftime('%s','now') * 1000),
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS command_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guild_id TEXT,
    user_id TEXT NOT NULL,
    command TEXT NOT NULL,
    args TEXT,
    created_at INTEGER DEFAULT (strftime('%s','now') * 1000)
  );
`);

// ---- AFK ----
function setAfk(userId, guildId, reason) {
  const stmt = db.prepare(`
    INSERT INTO afk (user_id, guild_id, reason, timestamp, mentions)
    VALUES (?, ?, ?, ?, 0)
    ON CONFLICT(user_id, guild_id) DO UPDATE SET
      reason = excluded.reason,
      timestamp = excluded.timestamp,
      mentions = 0
  `);
  stmt.run(userId, guildId, reason, Date.now());
}

function removeAfk(userId, guildId) {
  db.prepare('DELETE FROM afk WHERE user_id = ? AND guild_id = ?').run(userId, guildId);
}

function getAfk(userId, guildId) {
  return db.prepare('SELECT * FROM afk WHERE user_id = ? AND guild_id = ?').get(userId, guildId);
}

function isAfk(userId, guildId) {
  return !!getAfk(userId, guildId);
}

function bumpMentions(userId, guildId) {
  db.prepare('UPDATE afk SET mentions = mentions + 1 WHERE user_id = ? AND guild_id = ?').run(userId, guildId);
}

// ---- MODERATION ----
function addWarn(userId, guildId, moderatorId, reason) {
  return db.prepare('INSERT INTO warnings (user_id, guild_id, moderator_id, reason) VALUES (?, ?, ?, ?)').run(userId, guildId, moderatorId, reason);
}

function getWarnings(userId, guildId) {
  return db.prepare('SELECT * FROM warnings WHERE user_id = ? AND guild_id = ? ORDER BY created_at DESC').all(userId, guildId);
}

function clearWarnings(userId, guildId) {
  db.prepare('DELETE FROM warnings WHERE user_id = ? AND guild_id = ?').run(userId, guildId);
}

function addKick(userId, guildId, moderatorId, reason) {
  db.prepare('INSERT INTO kicks (user_id, guild_id, moderator_id, reason) VALUES (?, ?, ?, ?)').run(userId, guildId, moderatorId, reason);
}

function addBan(userId, guildId, moderatorId, reason) {
  db.prepare('INSERT INTO bans (user_id, guild_id, moderator_id, reason) VALUES (?, ?, ?, ?)').run(userId, guildId, moderatorId, reason);
}

function addMute(userId, guildId, moderatorId, reason, durationMinutes) {
  const expires = durationMinutes ? Date.now() + (durationMinutes * 60000) : null;
  db.prepare('INSERT INTO mutes (user_id, guild_id, moderator_id, reason, duration_minutes, expires_at) VALUES (?, ?, ?, ?, ?, ?)')
    .run(userId, guildId, moderatorId, reason, durationMinutes || null, expires);
}

function getActiveMutes(guildId) {
  return db.prepare('SELECT * FROM mutes WHERE guild_id = ? AND active = 1').all(guildId);
}

function unmuteDb(userId, guildId) {
  db.prepare('UPDATE mutes SET active = 0 WHERE user_id = ? AND guild_id = ?').run(userId, guildId);
}

// ---- LOGGING ----
function logCommand(userId, command, args, guildId) {
  db.prepare('INSERT INTO command_logs (user_id, command, args, guild_id) VALUES (?, ?, ?, ?)')
    .run(userId, command, JSON.stringify(args), guildId);
}

function getRecentLogs(limit = 50) {
  return db.prepare('SELECT * FROM command_logs ORDER BY created_at DESC LIMIT ?').all(limit);
}

module.exports = {
  setAfk, removeAfk, getAfk, isAfk, bumpMentions,
  addWarn, getWarnings, clearWarnings,
  addKick, addBan, addMute, getActiveMutes, unmuteDb,
  logCommand, getRecentLogs,
  db
};