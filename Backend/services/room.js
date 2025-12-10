const helper = require('../helper.js');
const RoomDao = require('../dao/roomDao.js');
const express = require('express');
const serviceRouter = express.Router();

console.log('- Service Room');

// Alle Räume
serviceRouter.get('/rooms/all', (req, res) => {
    const roomDao = new RoomDao(req.app.locals.dbConnection);
    try {
        const rooms = roomDao.loadAll();
        res.status(200).json(rooms);
    } catch (ex) {
        res.status(500).json({ fehler: true, nachricht: ex.message });
    }
});

// Einzelnen Raum nach ID
serviceRouter.get('/rooms/get/:id', (req, res) => {
    const roomDao = new RoomDao(req.app.locals.dbConnection);
    try {
        const room = roomDao.loadById(req.params.id);
        res.status(200).json(room);
    } catch (ex) {
        res.status(400).json({ fehler: true, nachricht: ex.message });
    }
});

// Neuen Raum anlegen
serviceRouter.post('/rooms/new', (req, res) => {
    console.log('Request body:', req.body);
    const roomDao = new RoomDao(req.app.locals.dbConnection);
    try {
        if (!req.body.name) throw new Error('Raumname fehlt');
        const room = roomDao.create(req.body.name);
        res.status(200).json(room);
    } catch (ex) {
        res.status(400).json({ fehler: true, nachricht: ex.message });
    }
});

// Raum bearbeiten
serviceRouter.put('/rooms/edit/:id', (req, res) => {
    const roomDao = new RoomDao(req.app.locals.dbConnection);
    try {
        if (!req.body.name) throw new Error('Raumname fehlt');
        const room = roomDao.update(req.params.id, req.body.name);
        res.status(200).json(room);
    } catch (ex) {
        res.status(400).json({ fehler: true, nachricht: ex.message });
    }
});

// Raum löschen
serviceRouter.delete('/rooms/delete/:id', (req, res) => {
    const roomDao = new RoomDao(req.app.locals.dbConnection);
    try {
        roomDao.delete(req.params.id); 
        res.status(200).json({ gelöscht: true });
    } catch (ex) {
        res.status(400).json({ fehler: true, nachricht: ex.message });
    }
});

module.exports = serviceRouter;
