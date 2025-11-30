const express = require('express');
const path = require('path');
const roomsRoute = require('./routes/rooms');
const devicesRoute = require('./routes/devices');
const deviceTypesRoute = require('./routes/device_types');

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// API Route
app.use('/api/rooms', roomsRoute);
app.use('/api/devices', devicesRoute);
app.use('/api/device_types', deviceTypesRoute);

// Standard Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});


app.listen(port, () => console.log(`Server läuft auf http://localhost:${port}`));
