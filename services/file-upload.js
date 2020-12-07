// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');

// aws.config.update({
// 	secretAccessKey: process.env.AWS_SECRET_ACCESS,
// 	accessKeyId: process.env.AWS_ACCESS_KEY,
// 	region: 'us-east-2'
// });

// const s3 = new aws.S3();


// const upload = multer({
// 	storage: multerS3({
// 		s3: s3,
// 		bucket: 'summermute-fempeg',
// 		metadata: function (req, file, cb) {
// 			cb(null, {fielName: file.fieldname});
// 		},
// 		key: function (req, file, cb) {
// 			cb(null, Date.now(),toString())
// 		}
// 	})
// });

// module.exports = upload;


///////////////////////////////

// import { media as Media } from '../models';
const db = require("../models");
const aws = require('aws-sdk');
const fs = require('fs');


function upload(req, res) {
    // aws.config.setPromisesDependency();
    //console.log(req.file);
    //console.log(process.env);
    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS,
        region: process.env.REGION
    });
    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS,
        region: process.env.REGION
    });
    var params = {
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: fs.createReadStream(req.file.path),
        Key: `${req.user.username}/${req.file.originalname}`
    };
    //console.log(s3);
    s3.putObject(params, (err, data) => {
        if (err) {
            console.log('Error occured while trying to upload to S3 bucket', err);
        }
        console.log(data);
        //const objectUrl = s3.getObjectUrl();
        if (data) {
            fs.unlinkSync(req.file.path); // Empty temp folder
            const locationUrl = data.Location;
            let newMedia = db.Media
                .create({
                    // id: req.user.id,
                    mediaName: req.file.originalname,
                    mediaLink: "https://summermute-fempeg.s3.us-east-2.amazonaws.com/" + req.user.username + "/" + req.file.originalname,
                    UserId: req.user.id
                })
            	.then(media => {
                    res.json({ message: 'Media upload success.', media });
                })
                .catch(err => {
                    console.log('Error occured while trying to save to DB');
                    console.log(err);
                });
        }
    });
};
module.exports = upload;