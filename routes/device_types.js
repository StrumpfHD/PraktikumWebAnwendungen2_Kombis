const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

const router = express.Router();

async function openDb() {
    return open({
        filename: path.join(__dirname, '../Datenbank/Smart_Home_Dashboard.sqlite'),
        driver: sqlite3.Database
    });
}

// GET /api/device_types → alle Gerätetypen
router.get('/', async (req, res) => {
    try {
        const db = await openDb();
        const deviceTypes = await db.all('SELECT * FROM device_type ORDER BY name;');
        res.json(deviceTypes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Datenbankfehler' });
    }
});

module.exports = router;
