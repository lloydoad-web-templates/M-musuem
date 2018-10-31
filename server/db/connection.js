// what actually connects to the database
const monk = require("monk");
const connectionUrl = process.env.MONGODB_URI || "localhost/myahmusuem-me/"
const db = monk(connectionUrl);

module.exports = db;