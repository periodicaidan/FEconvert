// S3 ROUTES
const upload = require("../services/file-upload");
// const singleUpload = upload.single('media
const multer = require("multer")
const db = require("../models");


module.exports = function(app) {

    app.post("/api/media_upload", multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single(
        'newMedia'
    ), function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.status(401).json({});
        } else {
            upload(req, res)
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