const express = require('express');
const path = require("path");
const fs = require("fs");
//needs express and path 
const noteData = require('./db/db.json');
const PORT = 3002;

const app = express();

//line below tells how to parse the data from json
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => res.sendFile('./public/index.html'));
//name homepage index.html

app.get("/notes", (req, res) =>
  res.sendFile("public/notes.html", { root: __dirname })
);
// app.get('/notes', (req, res) => res.sendFile('./public/notes.html'));

app.get('/api/notes', (req, res) => res.json(noteData));
//returning all information and notes..

//access the body variable... 
app.post('/api/notes', (req, res) => {
  console.log(req.body);
    noteData.push(req.body);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
});
//fs.writefile is similar to saving to database.

app.delete('/api/notes/:id', (req, res) => {
  noteData.delete(req.params.id);
});

//Should I have fs.writeFile in my delete route above?
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

