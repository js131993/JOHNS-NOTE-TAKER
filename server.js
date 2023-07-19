const express = require('express');
const path = require("path");
const fs = require("fs");
//needs express and path 
let noteData = require('./db/db.json');
//array of notes--> arrays have built in js methods
const PORT = process.env.port || 3002;

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
//reading information

//post means creating a resource 
app.post('/api/notes', (req, res) => {
  //.length gives us the number of posts or notes in the db.json array
  req.body.id = noteData.length;
  //req is per request, I am defining a new property on id, must call based on info
  console.log(req.body);
    noteData.push(req.body);
    //req.body holds each new note push is putting into db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
    res.sendStatus(200);
});
//fs.writefile is similar to saving to database.

app.delete('/api/notes/:id', (req, res) => {
  // comparing two numbers below. filters out note with matching id.
  noteData = noteData.filter((n) => req.params.id != n.id);
  //filter is a higher order function, takes in a function and it run against every element in noteData, for every note, filter out what we don't want
  fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
  res.sendStatus(200);
});

//Should I have fs.writeFile in my delete route above?
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

