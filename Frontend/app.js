// workaround / bugfix for linux systems
Object.fromEntries = l => l.reduce((a, [k, v]) => ({ ...a, [k]: v }), {});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const path = require('path');

console.log('Starting frontend server...');

try {
    const HTTP_PORT = 3000;

    console.log('Creating and configuring Web Server...');
    const app = express();

    console.log('Binding middleware...');
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));

    // Header
    app.use(function (request, response, next) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.use(express.static(__dirname));
    // STATIC FOLDERS
    app.use('/css', express.static(path.join(__dirname, 'css')));
    app.use('/js', express.static(path.join(__dirname, 'js')));

    app.use('/pictures', express.static(path.join(__dirname, '../backend/public/pictures')));

    // Dashboard.html laden
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'Dashboard.html'));
    });

    // 404
    app.use((req, res) => {
        res.status(404).send('Seite nicht gefunden');
    });

    console.log('\nBinding Port and starting Webserver...');
    app.listen(HTTP_PORT, () => {
        console.log(`Frontend Server läuft unter http://localhost:${HTTP_PORT}`);
    });

} catch (ex) {
    console.error(ex);
}
