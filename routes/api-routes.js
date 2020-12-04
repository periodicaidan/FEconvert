// Requiring our models and passport as we've configured it
const db = require("../models");
const upload = require("../services/file-upload");
const singleUpload = upload.single('image');
const passport = require("../config/passport");

module.exports = function(app) {
  // Route for logging in
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.status(401).json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        id: req.user.id,
        username: req.body.username,
        email: req.user.email
        
      });
    }
  });

 // S3 ROUTES

  app.post("api/image-upload", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.status(401).json({});
    } else {
      singleUpload(req,res, function(err){
        return res.json({'imageUrl': req.file.location})
      });
    }
  })

  app.get("/api/user_media", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.status(401).json({});
    } else {
      // Otherwise send back the user's media and id
      res.json({
        id: req.user.id,
        files : req.user.files
      });
    }
  });
};
