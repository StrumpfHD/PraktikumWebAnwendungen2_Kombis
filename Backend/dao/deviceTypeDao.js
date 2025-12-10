const helper = require('../helper.js');

class DeviceTypeDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const sql = 'SELECT * FROM device_type WHERE device_type_id=?';
        const stmt = this._conn.prepare(sql);
        const result = stmt.get(id);

        if (helper.isUndefined(result))
            throw new Error('No device_type found by id=' + id);

        return result;
    }

    loadAll() {
        const sql = 'SELECT * FROM device_type ORDER BY name ASC';
        const stmt = this._conn.prepare(sql);
        const result = stmt.all();

        return helper.isArrayEmpty(result) ? [] : result;
    }

    toString() {
        console.log('deviceTypeDao [_conn=' + this._conn + ']');
    }
}

module.exports = DeviceTypeDao;