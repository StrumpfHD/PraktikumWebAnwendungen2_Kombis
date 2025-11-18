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

// POST /api/rooms → neuen Raum anlegen
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Name ist erforderlich" });

        const db = await openDb();
        await db.run("INSERT INTO room (name) VALUES (?)", [name]);

        res.status(201).json({ message: "Raum erfolgreich hinzugefügt" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    }
});

// GET /api/rooms → alle Räume abrufen
router.get('/', async (req, res) => {
    try {
        const db = await openDb();
        const rooms = await db.all("SELECT room_id, name FROM room");
        res.json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    }
});

// DELETE /api/rooms/:id → Raum löschen
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await openDb();

        const result = await db.run("DELETE FROM room WHERE room_id = ?", [id]);

        if (result.changes === 0) {
            return res.status(404).json({ error: "Raum nicht gefunden" });
        }

        res.json({ message: "Raum erfolgreich gelöscht" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Datenbankfehler" });
    }
});

module.exports = router;