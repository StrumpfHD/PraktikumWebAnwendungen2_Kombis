const helper = require('../helper.js');
const DeviceDao = require('../dao/deviceDao.js');
const express = require('express');
const serviceRouter = express.Router();

console.log('- Service Device');

// Alle Geräte
serviceRouter.get('/device/all', (req, res) => {
    const deviceDao = new DeviceDao(req.app.locals.dbConnection);
    try {
        const devices = deviceDao.loadAll();
        res.status(200).json(devices);
    } catch (ex) {
        res.status(500).json({ fehler: true, nachricht: ex.message });
    }
});

// Einzelnes Gerät nach ID
serviceRouter.get('/device/get/:id', (req, res) => {
    const deviceDao = new DeviceDao(req.app.locals.dbConnection);
    try {
        const devices = deviceDao.loadById(req.params.id);
        res.status(200).json(devices);
    } catch (ex) {
        res.status(400).json({ fehler: true, nachricht: ex.message });
    }
});

// Gerät neu anlegen
serviceRouter.post('/device/new', (req, res) => {
    console.log('Request body:', req.body);
    const deviceDao = new DeviceDao(req.app.locals.dbConnection);
    try {
        if (!req.body.name) throw new Error('Gerätename fehlt');
        if (!req.body.device_type_id) throw new Error('Gerätetyp fehlt');
        if (!req.body.room_id) throw new Error('Raumzuordnung fehlt');
        if (req.body.value === undefined || req.body.value === null) throw new Error('Gerätewert fehlt');
        const device = deviceDao.create(
            req.body.name,
            req.body.device_type_id,
            req.body.room_id,
            req.body.value
        );
        res.status(200).json(device);
    } catch (ex) {
        res.status(400).json({ fehler: true, nachricht: ex.message });
    }
});

// Gerät bearbeiten
serviceRouter.put('/device/edit/:id', (req, res) => {
    const deviceDao = new DeviceDao(req.app.locals.dbConnection);
    try {
        if (!req.body.name) throw new Error('Gerätename fehlt');
        if (!req.body.device_type_id) throw new Error('Gerätetyp fehlt');
        if (!req.body.room_id) throw new Error('Raumzuordnung fehlt');
        if (!req.body.value) throw new Error('Gerätewert fehlt');
        const device = deviceDao.update(
            req.params.id,
            req.body.name,
            req.body.device_type_id,
            req.body.room_id,
            req.body.value
        );
        res.status(200).json(device);
    } catch (ex) {
        res.status(400).json({ fehler: true, nachricht: ex.message });
    }
});

// Wert eines Geräts ändern
serviceRouter.put('/device/value/:id', (req, res) => {
    const deviceDao = new DeviceDao(req.app.locals.dbConnection);
    try {
        if (req.body.value === undefined) throw new Error('Neuer Wert fehlt');
        const device = deviceDao.updateValue(req.params.id, req.body.value);
        res.status(200).json(device);
    } catch (ex) {
        res.status(400).json({ fehler: true, nachricht: ex.message });
    }
});


serviceRouter.delete('/device/delete/:id', (req, res) => {
    const deviceDao = new DeviceDao(req.app.locals.dbConnection);
    try {
        deviceDao.delete(req.params.id);
        res.status(200).json({ gelöscht: true });
    } catch (ex) {
        res.status(400).json({ fehler: true, nachricht: ex.message });
    }
});

module.exports = serviceRouter;