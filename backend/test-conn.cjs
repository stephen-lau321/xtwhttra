const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient({ datasourceUrl: "file:C:/Users/ASUS/AppData/Local/Temp/test_prisma.db" });
client.$connect()
  .then(() => { console.log("Connected OK"); process.exit(0); })
  .catch((e) => { console.error("Error:", e.message); process.exit(1); });