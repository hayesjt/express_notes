const router = require("express").Router();
const fs = require("fs");

router.get("/notes", function(req, res){
    fs.readFile("db/db.json", "utf8", function(err, data){
        if (err) {
            console.log("File read failed: " + err);
            return
        }
        res.json(JSON.parse(data))
    })
})

module.exports = router 