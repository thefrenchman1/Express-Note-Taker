const express = require('express');
const notesRouter = require('./routes/notes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', notesRouter);

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// Server
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
