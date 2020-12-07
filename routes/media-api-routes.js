// S3 ROUTES
const upload = require("../services/file-upload");
// const singleUpload = upload.single('media');
const db = require("../models");


module.exports = function(app) {

    app.post("/api/media_upload", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.status(401).json({});
        } else {
            upload(req, res, function(err, result) {
                // return res.json({ 'mediaUrl': req.file.location })
                //TODO
                // db.Media.create({
                // mediaName: req.file.name,
                // mediaLink: req.file.location
                // });
                console.log(result);
            });
        }
    });

    app.get("/api/user_media", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.status(401).json({});
        } else {
            let query = {};
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