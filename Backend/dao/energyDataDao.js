// dao/energyDataDao.js
const helper = require('../helper.js');

class EnergyDataDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadDevicesWithEnergy() {
      const sql = `
        SELECT DISTINCT d.device_id, d.name
        FROM energy_data e
        JOIN device d ON d.device_id = e.device_id
        ORDER BY d.name
      `;
      const stmt = this._conn.prepare(sql);
      const result = stmt.all();
      return helper.isArrayEmpty(result) ? [] : result;
    }

    loadSummaryLast7Days() {
      const sql = `
        WITH max_day AS (
          SELECT date(MAX(timestamp)) AS d
          FROM energy_data
        )
        SELECT 
          date(timestamp) AS day,
          SUM(generation)  AS totalGeneration,
          SUM(consumption) AS totalConsumption
        FROM energy_data, max_day
        WHERE date(timestamp) >= date(max_day.d, '-6 day')
        GROUP BY date(timestamp)
        ORDER BY date(timestamp)
      `;
      const stmt = this._conn.prepare(sql);
      const result = stmt.all();
      return helper.isArrayEmpty(result) ? [] : result;
    }

    // 🔹 NEU: letzte 30 Tage
    loadSummaryLast30Days() {
      const sql = `
        WITH max_day AS (
          SELECT date(MAX(timestamp)) AS d
          FROM energy_data
        )
        SELECT 
          date(timestamp) AS day,
          SUM(generation)  AS totalGeneration,
          SUM(consumption) AS totalConsumption
        FROM energy_data, max_day
        WHERE date(timestamp) >= date(max_day.d, '-29 day')
        GROUP BY date(timestamp)
        ORDER BY date(timestamp)
      `;
      const stmt = this._conn.prepare(sql);
      const result = stmt.all();
      return helper.isArrayEmpty(result) ? [] : result;
    }

    // 🔹 NEU: letzte 365 Tage
    loadSummaryLast365Days() {
      const sql = `
        WITH max_day AS (
          SELECT date(MAX(timestamp)) AS d
          FROM energy_data
        )
        SELECT 
          date(timestamp) AS day,
          SUM(generation)  AS totalGeneration,
          SUM(consumption) AS totalConsumption
        FROM energy_data, max_day
        WHERE date(timestamp) >= date(max_day.d, '-364 day')
        GROUP BY date(timestamp)
        ORDER BY date(timestamp)
      `;
      const stmt = this._conn.prepare(sql);
      const result = stmt.all();
      return helper.isArrayEmpty(result) ? [] : result;
    }

    loadDeviceLast7Days(deviceId) {
      if (!helper.isNumeric(deviceId)) {
        throw new Error('deviceId must be numeric');
      }

      const sql = `
        WITH max_day AS (
          SELECT date(MAX(timestamp)) AS d
          FROM energy_data
          WHERE device_id = ?
        )
        SELECT 
          date(timestamp) AS day,
          SUM(generation)  AS totalGeneration,
          SUM(consumption) AS totalConsumption
        FROM energy_data, max_day
        WHERE device_id = ?
          AND date(timestamp) >= date(max_day.d, '-6 day')
        GROUP BY date(timestamp)
        ORDER BY date(timestamp)
      `;
      const stmt = this._conn.prepare(sql);
      const result = stmt.all(deviceId, deviceId);
      return helper.isArrayEmpty(result) ? [] : result;
    }

    toString() {
        console.log('EnergyDataDao [_conn=' + this._conn + ']');
    }
}

module.exports = EnergyDataDao;


// ❗WICHTIG: genau so exportieren
module.exports = EnergyDataDao;
