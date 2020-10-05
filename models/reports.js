const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");

const reports = {
    getAll: function(res) {
        db.all("SELECT * FROM reports",
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/reports",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }
            return res.status(201).json({
                data: {
                    message: "Selected all",
                    result: result
                }
            });
        });
    },
    get: function(res, week) {
        db.get("SELECT * FROM reports WHERE week IS (?)",
        week,
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/reports",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }
            return res.status(201).json({
                data: {
                    message: "Selected one",
                    result: row
                }
            });
        });
    },
    add: function(res, week, content) {

        db.run("REPLACE INTO reports (week, content) VALUES(?, ?)",
        week,
        content,
        (err) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/reports",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }
            return res.status(201).json({
                data: {
                    message: `Report added for week ${week}`
                }
            });
        });
    }
}

module.exports = reports;
