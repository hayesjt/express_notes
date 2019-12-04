const router = require("express").Router();
const fs = require("fs");

// GETTING ALL NOTES IN DB.JSON FILE TO DISPLAY ON SCREEN
router.get("/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log("File read failed: " + err);
            return
        }
        res.json(JSON.parse(data))
    });
});

// POSTING NEW NOTES TO POST TO DB.JSON IN ORDER TO SHOW ON PAGE
router.post("/notes", function (req, res) {

    // READING THE FILE FIRST SO WE DONT OVERRIDE OTHER DATA
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

        // GIVING AN ID TO THE NOTE SO IT CAN DISPLAY
        let newNote = req.body;

        lastID++;
        newNote.id = lastID;

        origData.push(newNote);

       
        // WRITING TO JSON FILE SO IT CAN DISPLAY ON WEBSITE
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