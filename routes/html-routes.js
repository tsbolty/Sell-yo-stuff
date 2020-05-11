const path = require("path");
var db = require("../models");


// will need  route for homepage, all posts page, sign up page, login page, create posts page

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated.js");

module.exports = function(app) {

    app.get("/", function(req, res) {
        if (res.user) {
            // If the user is already logged in send them to their Profile Page
            res.redirect("/profile");
        }
    // Otherwise, just show the Home Page
    });

    app.get("/viewPost", function(req, res){
        //Show viewPost Page
        db.Post.findAll().then(function(response){
            res.render("viewPost", response);
        });
        // res.sendFile(path.join(__dirname, "../views/viewPost.handlebars"));
        // res.render("viewPost");
    });

    app.get("/login", function(req, res) {
        if (res.user) {
            // If the user is already logged in send them to the members page
            res.redirect("/createPost");
        }
        //Otherwise, allow them to log in
        res.sendFile(path.join(__dirname, "../public/loginSplash.html"));
    });


    // Here we've add our isAuthenticated middleware to these routes.
    app.get("/createPost", isAuthenticated, function(req, res) {
        if(isAuthenticated && res.user){
            //If user is logged in, allow them to create a post
            res.sendFile(path.join(__dirname, "../public/createPost.html"));
        } else{
            //Otherwise, redirect to signup
            res.redirect("/signup");
        }

    });

    app.get("/signup", isAuthenticated, function(req, res) {
        if(isAuthenticated && res.user){
            //If user is logged in, redirect to Profile Page
            res.redirect("/profile");
        }
        //Otherwise, allow them to sign up
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/profile", isAuthenticated, function(req,res){
        if(isAuthenticated && res.user){
            //If user is logged in, send them to their Profile Page
            res.sendFile(path.join(__dirname, "../public/profile.html"));
        } else {
            //Otherwise, redirect to Signup Page
            res.redirect("/signup");
        }
    });
};