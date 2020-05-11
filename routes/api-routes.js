var db = require("../models");
const keys = require("../keys.js")
const AWS = require("aws-sdk");
const passport = require ("../config/passport")

module.exports = function(app){

    app.get("/api/splash", function(req, res) {
        res.redirect("/");
    });

    // get route for posts page
    app.get("/api/posts", function(req, res){
        db.Post.findAll({raw: true}).then(function(response){
            const posts = response.map(post =>{
                if(post.images !== null){
                post.images = post.images.split(", ").map(image=> {
                    return {image: image}
                })
            }
                return post;
            })
        res.render("viewPost", {posts: posts}); 
        });
    });
    
    // get route for login page
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    // sign up route
    app.post("/api/signup", function(req, res) {
        db.User.create(req.body).then(function() {
            res.redirect(307, "/api/login");
        }).catch(function(err) {
            res.status(401).json(err);
        });
    });

    // create post route
    app.post("/api/post", function(req, res){
        req.body.zipCode = parseInt(req.body.zipCode)
        db.Post.create(req.body).then(data=>{
            res.status(200).end()
        }).catch(err=>{
            console.log(err)
            res.status(401).json(err)
        })
    });

    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
          // The user is not logged in, send back an empty object
          res.json({});
        } else {
          // Otherwise send back the user's email and id
          // Sending back a password, even a hashed password, isn't a good idea
          res.json({
            email: req.user.email,
            id: req.user.id
          });
        }
      });

    // log out route

    app.get("/api/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
          // The user is not logged in, send back an empty object
          res.json({});
        } else {
          // Otherwise send back the user's email and id
          // Sending back a password, even a hashed password, isn't a good idea
          res.json({
            email: req.user.email,
            id: req.user.id
          });
        }
      });

    const s3 = new AWS.S3({
        accessKeyId: keys.s3key,
        secretAccessKey: keys.s3secret
    });

    app.post("/upload", async (req, res) => {
        if (!req.files) {
            return res.status(400).send("No file was uploaded.");
        }
    
        const uploadFile = req.files.upload;
    
        const params = {
            Body: uploadFile.data, // data from uploaded file
            Bucket: keys.s3bucket, // bucket name
            Key: `${Date.now()}-${uploadFile.name}` // file name to use for S3 bucket
        };
    
        s3.upload(params, (err, response) => {
            if (err) {throw err};
        
            console.log(`File uploaded successfully at ${response.Location}`);
            // terminating the req/res cycle by sending a JSON object with the uploaded
            // file path AND any date sent along with the upload... this is where you 
            // could write to your db if needed, now that you have the url path for the
            // newly uploaded file!
            res.json({ url: response.Location, data: req.body });
        });
    });
};
// call models to create user, create posts, delete posts, update posts
