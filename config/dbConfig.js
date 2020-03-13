const mysql = require("mysql");
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } = require("./constants");
const util = require("util");

dbConnectionInfo = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    multipleStatements: true
};

var dbconnection = mysql.createConnection(dbConnectionInfo);
// dbconnection.connect();
// Attempt to catch disconnects
dbconnection.on(
    "connect",
    function() {
        console.log("@connected to db");
    },
    "end",
    function(err) {
        console.log("@end ", err);
        throw err;
    },
    "close",
    function(err) {
        console.log("@closed ", err);
        throw err;
    }
);

dbconnection.query = util.promisify(dbconnection.query);

module.exports = dbconnection;
