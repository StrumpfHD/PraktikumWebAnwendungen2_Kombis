const helper = require('../helper.js');
const DeviceTypeDao = require('../dao/deviceTypeDao.js');
const express = require('express');
const serviceRouter = express.Router();

console.log('- Service DeviceType');

// Alle Gerätetypen
serviceRouter.get('/device_type/all', (req, res) => {
    const deviceTypeDao = new DeviceTypeDao(req.app.locals.dbConnection);
    try {
        const deviceTypes = deviceTypeDao.loadAll();
        res.status(200).json(deviceTypes);
    } catch (ex) {
        res.status(500).json({ fehler: true, nachricht: ex.message });
    }
});

module.exports = serviceRouter;