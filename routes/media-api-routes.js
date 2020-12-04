// S3 ROUTES
const upload = require("../services/file-upload");
const singleUpload = upload.single('image');

module.exports = function(app) {

  app.post("api/media-upload", function(req, res) {
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
