const path = require("path");
const router = require("express").Router();

// route to note HTML page - only with /notes
router.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

// anything else goes to main page
router.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = router