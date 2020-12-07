// S3 ROUTES
const upload = require("../services/file-upload");
const singleUpload = upload.single('media');
const db = require("../models");


module.exports = function(app) {

    app.post("api/media-upload", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.status(401).json({});
        } else {
            singleUpload(req, res, function(err) {
                return res.json({ 'mediaUrl': req.file.location })
            });
        }
    });

    app.get("/api/user-media", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.status(401).json({});
        } else {
            var query = {};
            if (req.query.UserId) {
                query.UserId = req.query.User_Id;
            }
            db.Media.findAll({
                where: query
            }).then(function(dbMedia) {
                res.json(dbMedia);
            });
        }
    });
};