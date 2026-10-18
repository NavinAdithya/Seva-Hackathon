import * as SQLite from 'expo-sqlite';

const DB_NAME = 'signsos.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (dbInstance) return dbInstance;

  dbInstance = await SQLite.openDatabaseAsync(DB_NAME);

  await dbInstance.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS emergency_phrases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      subcategory TEXT NOT NULL DEFAULT '',
      text_en TEXT NOT NULL,
      text_ta TEXT NOT NULL,
      text_hi TEXT NOT NULL,
      icon TEXT NOT NULL DEFAULT '',
      severity TEXT NOT NULL DEFAULT 'medium',
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS responder_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phrase_id INTEGER NOT NULL,
      question_en TEXT NOT NULL,
      question_ta TEXT NOT NULL,
      question_hi TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (phrase_id) REFERENCES emergency_phrases(id)
    );

    CREATE TABLE IF NOT EXISTS question_options (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id INTEGER NOT NULL,
      option_en TEXT NOT NULL,
      option_ta TEXT NOT NULL,
      option_hi TEXT NOT NULL,
      icon TEXT DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (question_id) REFERENCES responder_questions(id)
    );

    CREATE TABLE IF NOT EXISTS emergency_card (
      id INTEGER PRIMARY KEY DEFAULT 1,
      name TEXT NOT NULL DEFAULT '',
      age INTEGER,
      blood_group TEXT DEFAULT '',
      allergies TEXT DEFAULT '',
      medications TEXT DEFAULT '',
      conditions TEXT DEFAULT '',
      language TEXT NOT NULL DEFAULT 'en',
      communication_preferences TEXT NOT NULL DEFAULT '[]',
      emergency_contacts TEXT NOT NULL DEFAULT '[]',
      updated_at INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS user_preferences (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  return dbInstance;
}

export async function closeDatabase(): Promise<void> {
  if (dbInstance) {
    await dbInstance.closeAsync();
    dbInstance = null;
  }
}
