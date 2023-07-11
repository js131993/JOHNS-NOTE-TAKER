const express = require('express');
const path = require("path");
const fs = require("fs");
//needs express and path 
const noteData = require('./db/db.json');
const PORT = 3000;

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => res.sendFile('./public/index.html'));
//name homepage index.html

app.get("/notes", (req, res) =>
  res.sendFile("public/notes.html", { root: __dirname })
);
// app.get('/notes', (req, res) => res.sendFile('./public/notes.html'));

app.get('/api/notes/:id', (req, res) => res.json(noteData));
//returning all information and notes..

//access the body variable... 
app.post('/api/notes/:id', (req, res) => {
    noteData.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(noteData));
});
//fs.writefile is similar to saving to database.

app.delete('/api/notes/:id', (req, res) => {
  noteData.pop(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(noteData));
});
//Should I have fs.writeFile in my delete route above?


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

