const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;



let notesData = [];


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));

// routes



app.get("/api/notes", function(err, res) {
    try {
    // reads the notes from json file

    notesData = fs.readFileSync("Develop/db/db.json", "utf8");
    console.log("hello!");

    // parse it so notesData is an array

    notesData = JSON.parse(notesData);

    // handles errors

    } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.log(err);
    }
  //   send objects to the browser

    res.json(notesData);
}
);

// writes the new note to the json file

app.post("/api/notes", function(req, res) {
    try {
    
    notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
    console.log(notesData);

    
    notesData = JSON.parse(notesData);

    // Set new notes id

    req.body.id = notesData.length;
    
    notesData.push(req.body); 
    
    notesData = JSON.stringify(notesData);

    // writes the new note to file

    fs.writeFile("./Develop/db/db.json", notesData, "utf8", function(err) {

      // error handling

    if (err) throw err;
    });
    
    res.json(JSON.parse(notesData));

    // error Handling

    } catch (err) {
    throw err;
    console.error(err);
    }
}
  );

// Delete a note

app.delete("/api/notes/:id", function(req, res) {
    try {
    
    notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
    
    notesData = JSON.parse(notesData);
    
    notesData = notesData.filter(function(note) {
    return note.id != req.params.id;
    });
    
    notesData = JSON.stringify(notesData);
    
    fs.writeFile("./Develop/db/db.json", notesData, "utf8", function(err) {
    
    if (err) throw err;
    });

    res.send(JSON.parse(notesData));

    } catch (err) {
    throw err;
    console.log(err);
    }
});


  app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
}
  );

// If no matching route is found

  app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

  app.get("/api/notes", function(req, res) {
  return res.sendFile(path.json(__dirname, "Develop/db/db.json"));
}
  );

// Start the server

app.listen(PORT, function() {
  console.log("SERVER IS LISTENING: " + PORT);
});