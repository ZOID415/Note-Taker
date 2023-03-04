//This is where you will write functionality for API call stored notes (locally) anytime someone adds or deletes one.
const path = require("path");
const fs = require("fs");
const router = require("express").Router();
var uniqid = require("uniqid");

// reads the json file and returns saved notes as JSON
router.get("/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.json(JSON.parse(data));
  });
  // posts note to save on body and json, then display note
});
router.post("/notes", (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uniqid(),
  };
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    // pushes new note after previous is posted
    const parseNotes = JSON.parse(data);
    console.log(parseNotes);
    parseNotes.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(parseNotes), (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Note Saved!");
    });

    res.json(parseNotes);
  });
  
});

router.delete("/notes/:id",
  (req, res) => {
    console.info(`${req.method} request recieved to delete a review`);
    const noteId = req.params.id;
    const db = JSON.parse(fs.readFileSync("db/db.json","utf-8")).filter(({ id }) => id !== noteId);
    const noteString = JSON.stringify(db);
    fs.writeFile(`db/db.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `review with ID of ${noteId} has been deleted from JSON file`
          )
    );
    res.json(db);
  });

// routing
module.exports = router;
