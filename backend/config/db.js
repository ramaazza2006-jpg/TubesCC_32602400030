const { Sequelize } = require("sequelize");
require("dotenv").config();

// IMPORTANT: DB_HOST must be the docker-compose service name (e.g. "db"),
// never "localhost" — inside a Docker container, "localhost" refers to the
// container itself, not the MySQL container next to it.
const sequelize = new Sequelize(
  process.env.DB_NAME || "studysync",
  process.env.DB_USER || "studysync",
  process.env.DB_PASSWORD || "studysync123",
  {
    host: process.env.DB_HOST || "db",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: true,
    },
  }
);

async function connectWithRetry(retries = 15, delayMs = 3000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await sequelize.authenticate();
      console.log("✅ MySQL connected:", process.env.DB_HOST || "db");
      return;
    } catch (err) {
      console.log(
        `⏳ MySQL not ready yet (attempt ${attempt}/${retries}): ${err.message}`
      );
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error("Could not connect to MySQL after multiple retries");
}

module.exports = { sequelize, connectWithRetry };
