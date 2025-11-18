const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Alles im public-Ordner als statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'html')));

// Standard-Route: dashboard.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'dashboard.html'));
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});