const helper = require('../helper.js');

class RoomDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const sql = 'SELECT * FROM room WHERE room_id=?';
        const stmt = this._conn.prepare(sql);
        const result = stmt.get(id);

        if (helper.isUndefined(result))
            throw new Error('No room found by id=' + id);

        return result;
    }

    loadAll() {
        const sql = 'SELECT * FROM room ORDER BY name ASC';
        const stmt = this._conn.prepare(sql);
        const result = stmt.all();

        return helper.isArrayEmpty(result) ? [] : result;
    }

    exists(id) {
        const sql = 'SELECT COUNT(room_id) AS cnt FROM room WHERE room_id=?';
        const stmt = this._conn.prepare(sql);
        const result = stmt.get(id);

        return result.cnt === 1;
    }

    create(name) {
        const sql = 'INSERT INTO room (name) VALUES (?)';
        const stmt = this._conn.prepare(sql);
        const result = stmt.run(name);

        if (result.changes !== 1)
            throw new Error('Could not insert new room');

        return this.loadById(result.lastInsertRowid);
    }

    update(id, name) {
        const sql = 'UPDATE room SET name=? WHERE room_id=?';
        const stmt = this._conn.prepare(sql);
        const result = stmt.run(name, id);

        if (result.changes !== 1)
            throw new Error('Could not update room with id=' + id);

        return this.loadById(id);
    }

    delete(id) {
        const sql = 'DELETE FROM room WHERE room_id=?';
        const stmt = this._conn.prepare(sql);
        const result = stmt.run(id);

        if (result.changes !== 1)
            throw new Error('Could not delete room with id=' + id);

        return true;
    }

    loadDevicesForRoom(roomId) {
    const sql = `
        SELECT *
        FROM device
        WHERE room_id = ?
        ORDER BY name ASC
    `;
    const stmt = this._conn.prepare(sql);
    const result = stmt.all(roomId);

    return helper.isArrayEmpty(result) ? [] : result;
}


    toString() {
        console.log('RoomDao [_conn=' + this._conn + ']');
    }
}

module.exports = RoomDao;