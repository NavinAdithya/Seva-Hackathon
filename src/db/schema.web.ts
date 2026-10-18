// Web-specific schema stub (avoids importing native ExpoSQLite module on Web)
export async function getDatabase(): Promise<any> {
  return {};
}

export async function closeDatabase(): Promise<void> {
  return;
}
