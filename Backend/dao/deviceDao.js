const helper = require('../helper.js');

class DeviceDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const sql = 'SELECT * FROM device WHERE device_id=?';
        const stmt = this._conn.prepare(sql);
        const result = stmt.get(id);

        if (helper.isUndefined(result))
            throw new Error('No device found by id=' + id);

        return result;
    }

    loadAll() {
        const sql = 'SELECT * FROM device  WHERE device_type_id != 5 ORDER BY name ASC';
        const stmt = this._conn.prepare(sql);
        const result = stmt.all();

        return helper.isArrayEmpty(result) ? [] : result;
    }

    exists(id) {
        const sql = 'SELECT COUNT(device_id) AS cnt FROM device WHERE device_id=?';
        const stmt = this._conn.prepare(sql);
        const result = stmt.get(id);

        return result.cnt === 1;
    }

    create(name, device_type_id, room_id, value) {
        const sql = 'INSERT INTO device (name, device_type_id, room_id, value) VALUES (?, ?, ?, ?)';
        const stmt = this._conn.prepare(sql);
        const result = stmt.run(name, device_type_id, room_id, value);

        if(result.changes !== 1)
            throw new Error('Could not insert new device');

        return this.loadById(result.lastInsertRowid);
    }

    update(id, name, device_type_id, room_id, value) {
        const sql = 'UPDATE device SET name=?, device_type_id=?, room_id=?, value=? WHERE device_id=?';
        const stmt = this._conn.prepare(sql);
        const result = stmt.run(name, device_type_id, room_id, value, id);

        if(result.changes !== 1)
            throw new Error('Could not update device with id=' + id);
        
        return this.loadById(id);
    }

    delete(id) {
        const sql = 'DELETE FROM device WHERE device_id=?';
        const stmt = this._conn.prepare(sql);
        const result = stmt.run(id);

        if (result.changes !== 1)
            throw new Error('Could not delete device with id=' + id);

        return true;
    }

    toString() {
        console.log('deviceDao [_conn=' + this._conn + ']');
    }
}

module.exports = DeviceDao;