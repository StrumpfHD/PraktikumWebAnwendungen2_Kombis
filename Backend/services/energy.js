const express = require('express');
const helper = require('../helper.js');
const EnergyDataDao = require('../dao/energyDataDao.js');

const serviceRouter = express.Router();
console.log('- Service energy');

const weekdayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

// GET /api/energy/devices -> alle Geräte, die Energiedaten haben
serviceRouter.get('/energy/devices', (req, res) => {
  const dao = new EnergyDataDao(req.app.locals.dbConnection);

  try {
    const rows = dao.loadDevicesWithEnergy(); // [{device_id, name}, ...]
    res.status(200).json({ error: false, data: rows });
  } catch (ex) {
    console.error('GET /energy/devices failed:', ex);
    res.status(500).json({ error: true, message: ex.message });
  }
});

/**
 * GET /api/energy/today
 * Liefert Verbrauch, Ertrag und Bilanz des heutigen Tages.
 */
serviceRouter.get('/energy/today', (req, res) => {
  const dao = new EnergyDataDao(req.app.locals.dbConnection);

  try {
    const row = dao.loadLatestDaySummary();

    const consumption = row.totalConsumption || 0;
    const generation  = row.totalGeneration  || 0;
    const balance     = generation - consumption;

    res.status(200).json({
      error: false,
      data: {
        consumption: helper.round(consumption),
        generation:  helper.round(generation),
        balance:     helper.round(balance)
      }
    });

  } catch (ex) {
    console.error('GET /energy/today failed:', ex);
    res.status(500).json({ error: true, message: ex.message });
  }
});


/**
 * GET /api/energy/summary/week
 * letzte 7 Tage relativ zum max(timestamp)
 */
serviceRouter.get('/energy/summary/week', (req, res) => {
  const dao = new EnergyDataDao(req.app.locals.dbConnection);

  try {
    const rows = dao.loadSummaryLast7Days(); 
    const labels = [];
    const consumption = [];
    const generation = [];

    rows.forEach(r => {
      const d = new Date(r.day);          // r.day = 'YYYY-MM-DD'
      const label = weekdayNames[d.getDay()];
      labels.push(label);
      consumption.push(helper.round(r.totalConsumption || 0));
      generation.push(helper.round(r.totalGeneration  || 0));
    });

    res.status(200).json({
      error: false,
      data: { labels, consumption, generation }
    });
  } catch (ex) {
    console.error('GET /energy/summary/week failed:', ex);
    res.status(500).json({ error: true, message: ex.message });
  }
});

// 🔹 letzte 30 Tage
serviceRouter.get('/energy/summary/month', (req, res) => {
  const dao = new EnergyDataDao(req.app.locals.dbConnection);

  try {
    const rows = dao.loadSummaryLast30Days();
    const labels = [];
    const consumption = [];
    const generation = [];

    rows.forEach(r => {
      const d = new Date(r.day);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      labels.push(`${dd}.${mm}.`);  // z.B. "03.11."
      consumption.push(helper.round(r.totalConsumption || 0));
      generation.push(helper.round(r.totalGeneration  || 0));
    });

    res.status(200).json({
      error: false,
      data: { labels, consumption, generation }
    });
  } catch (ex) {
    console.error('GET /energy/summary/month failed:', ex);
    res.status(500).json({ error: true, message: ex.message });
  }
});

// 🔹 letzte 365 Tage (relativ zum max(timestamp))
serviceRouter.get('/energy/summary/year', (req, res) => {
  const dao = new EnergyDataDao(req.app.locals.dbConnection);

  try {
    const rows = dao.loadSummaryLast365Days();
    const labels = [];
    const consumption = [];
    const generation = [];

    rows.forEach(r => {
      const d = new Date(r.day);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yy = String(d.getFullYear()).slice(-2);
      labels.push(`${dd}.${mm}.${yy}`); // "03.11.25"
      consumption.push(helper.round(r.totalConsumption || 0));
      generation.push(helper.round(r.totalGeneration  || 0));
    });

    res.status(200).json({
      error: false,
      data: { labels, consumption, generation }
    });
  } catch (ex) {
    console.error('GET /energy/summary/year failed:', ex);
    res.status(500).json({ error: true, message: ex.message });
  }
});

/**
 * GET /api/energy/device/:id/week
 * Aggregierte Werte für ein Device über 7 Tage.
 */
serviceRouter.get('/energy/device/:id/week', (req, res) => {
  const dao = new EnergyDataDao(req.app.locals.dbConnection);
  const deviceId = Number(req.params.id);

  if (!helper.isNumeric(deviceId)) {
    return res.status(400).json({ error: true, message: 'Invalid device id' });
  }

  try {
    const rows = dao.loadDeviceLast7Days(deviceId);

    const labels = [];
    const consumption = [];
    const generation = [];

    rows.forEach(r => {
      const d = new Date(r.day);
      const label = weekdayNames[d.getDay()];
      labels.push(label);
      consumption.push(helper.round(r.totalConsumption || 0));
      generation.push(helper.round(r.totalGeneration  || 0));
    });

    res.status(200).json({
      error: false,
      data: { labels, consumption, generation }
    });
  } catch (ex) {
    console.error('GET /energy/device/:id/week failed:', ex);
    res.status(500).json({ error: true, message: ex.message });
  }
});

module.exports = serviceRouter;
