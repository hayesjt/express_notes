const router = require("express").Router();
const fs = require("fs");

// fetching all data from db.json to display
router.get("/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log("File read failed: " + err);
            return
        }
        res.json(JSON.parse(data))
    });
});

// POSTING new notes to db.json
router.post("/notes", function (req, res) {

    // reading and fetching the those on the file first - we dont want to overwrite
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log("File read failed: " + err);
            return
        }
        let origData = JSON.parse(data);
        lastID = 0;
        for (i = 0; i < origData.length; i++) {
            lastID = origData[i].id;
        }

        // All notes need an id for the CRUD functions to properly work
        let newNote = req.body;

        lastID++;
        newNote.id = lastID;

        origData.push(newNote);

       
        // Writing to db.json so display happens
        fs.writeFile('db/db.json', JSON.stringify(origData), 'utf8', function (err) {
            if (err) throw err;
            console.log('The file has been saved!');
            res.json(origData)
        });

    });


});

// DELETING OLD NOTES FROM DB.JSON SO THEY ARE NOT SHOWN ON THE SCREEN
router.delete("/notes/:id", function (req, res) {

    // READING THE FILE FIRST SO WE DONT OVERRIDE OTHER DATA
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log("File read failed: " + err);
            return
        }
        let origData = JSON.parse(data);
        lastID = 0;
        for (i = 0; i < origData.length; i++) {
            console.log(origData[i].id, req.params.id);
            if (origData[i].id === parseInt(req.params.id)) {
                origData.splice(i, 1)
                console.log("slice hit")
            }
        }

        //WRITING FILE SO IT WILL BE TAKEN OFF WEBISTE  
        fs.writeFile('db/db.json', JSON.stringify(origData), 'utf8', function (err) {
            if (err) throw err;
            console.log('The file has been deleted!');
            res.json(origData)
        });

    });

});

module.exports = router 