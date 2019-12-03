var http = require("http");
var express = require("express");
var app = express();
var apiRoutes = require("./routes/apiRoutes")
var htmlRoutes = require("./routes/htmlRoutes")

var PORT = 8080;

// ESTABLISHING EXPRESS ROUTE
app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(express.static("public"));

// ACTUAL ROUTES
app.use("/api", apiRoutes)

app.use("/", htmlRoutes)

app.listen(PORT, function(){
    console.log("Server is ready to listen on port: " + PORT);
})

