const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const sqlPath = "F:/软件/自定义 Office 模板/codex/street-music/backend/prisma/init.sql";
const sql = fs.readFileSync(sqlPath, "utf-8");
const client = new PrismaClient({ datasourceUrl: "file:C:/Users/ASUS/AppData/Local/Temp/street-music.db" });
async function main() {
  await client.$connect();
  const statements = sql.split(";").filter(s => s.trim().length > 0);
  for (const stmt of statements) {
    const trimmed = stmt.trim() + ";";
    if (trimmed.replace(/[\s;]/g,"").length === 0) continue;
    try {
      await client.$executeRawUnsafe(trimmed);
    } catch(e) {
      console.error("SQL error:", e.message);
    }
  }
  console.log("Database tables created successfully");
  await client.$disconnect();
}
main().catch(e => { console.error(e.message); process.exit(1); });
