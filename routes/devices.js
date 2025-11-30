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

// GET /api/devices → alle Geräte laden
router.get('/', async (req, res) => {
    try {
        const db = await openDb();

        const devices = await db.all(`
        SELECT d.device_id AS id,
            d.name,
            d.value,
            d.device_type_id,
            d.room_id,
            r.name AS room_name,
            t.name AS device_type_name,
            t.unit
        FROM device d
        LEFT JOIN device_type t ON d.device_type_id = t.device_type_id
        LEFT JOIN room r ON d.room_id = r.room_id
        ORDER BY t.name, d.name;
        `);
        res.json(devices);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    }
});

// DELETE /api/devices/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await openDb();
        await db.run('DELETE FROM device WHERE device_id=?', [id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Datenbankfehler beim Löschen' });
    }
});

// PUT /api/devices/:id → Gerät aktualisieren
router.put('/:id', async (req, res) => {
    try {
        const { name, room_id, device_type_id, value } = req.body;
        const { id } = req.params;
        const db = await openDb();
        await db.run(
            'UPDATE device SET name=?, room_id=?, device_type_id=?, value=? WHERE device_id=?',
            [name, room_id, device_type_id, value, id]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Datenbankfehler beim Bearbeiten' });
    }
});

// POST /api/devices → neues Gerät erstellen
router.post('/', async (req, res) => {
    try {
        const { name, room_id, device_type_id, value } = req.body;
        const db = await openDb();
        const result = await db.run(
            'INSERT INTO device (name, room_id, device_type_id, value) VALUES (?, ?, ?, ?)',
            [name, room_id, device_type_id, value || '']
        );
        res.status(201).json({ device_id: result.lastID });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Datenbankfehler beim Hinzufügen' });
    }
});

module.exports = router;