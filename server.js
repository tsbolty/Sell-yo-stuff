// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
const express = require("express");
const fileUpload = require("express-fileupload");
var passport = require("./config/passport");
var session = require("express-session");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;


const db = require("./models");
var exphbs = require("express-handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(fileUpload());
app.use(express.static("Public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
// Add more here if we create more route files

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
