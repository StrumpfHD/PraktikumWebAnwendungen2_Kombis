const express = require('express');
const path = require('path');
const roomsRoute = require('./routes/rooms'); // hier einbinden

const app = express();
const port = 3000;

app.use(express.json()); // JSON Body Parsing

app.use(express.static(path.join(__dirname, 'public')));

// API Route
app.use('/api/rooms', roomsRoute); // Route aktivieren

// Standard Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});


app.listen(port, () => console.log(`Server läuft auf http://localhost:${port}`));
