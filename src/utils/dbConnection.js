const { QuickDB } = require("quick.db");
const path = require("path");

const db = new QuickDB({ filePath: "data/database.sqlite" });

module.exports = db;