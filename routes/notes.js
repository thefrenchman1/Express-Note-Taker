const express = require('express');
const { v1: uuidv1 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../public/js/secondary');

const notes = express.Router();

// Get
notes.get('/notes', async (req, res) => {
   try {
      const data = await readFromFile('./db/db.json');
      res.json(JSON.parse(data));
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// Post
notes.post('/notes', async (req, res) => {
   console.info(req.rawHeaders);
   console.info(`${req.method} request received`);

   const { title, text } = req.body;

   if (req.body) {
      const newNote = {
         title,
         text,
         id: uuidv1(),
      };

      try {
         const data = await readFromFile('./db/db.json');
         const notes = JSON.parse(data);
         notes.push(newNote);
         await writeToFile('./db/db.json', notes);
         res.json('Note added!');
      } catch (err) {
         res.status(500).json({ error: err.message });
      }
   } else {
      res.status(400).json('Bad Request: Missing request body');
   }
});

// Delete
notes.delete('/notes/:id', async (req, res) => {
   const noteId = req.params.id;

   try {
      const data = await readFromFile('./db/db.json');
      const notes = JSON.parse(data);
      const noteIndex = notes.findIndex((note) => note.id === noteId);

      if (noteIndex !== -1) {
         notes.splice(noteIndex, 1);
         await writeToFile('./db/db.json', notes);
         res.json('Note deleted!');
      } else {
         throw new Error('Note not found.');
      }
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

module.exports = notes;