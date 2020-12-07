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


const upload = {
  signup(req, res) {
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS,
      region: process.env.REGION
    });
    const s3 = new aws.S3();
    var params = {
      ACL: 'public-read',
      Bucket: process.env.BUCKET_NAME,
      Body: fs.createReadStream(req.file.path),
      Key: `userMedia/${req.file.originalname}`
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log('Error occured while trying to upload to S3 bucket', err);
      }

      if (data) {
        fs.unlinkSync(req.file.path); // Empty temp folder
        const locationUrl = data.Location;
        let newMedia = db.Media.create({ ...req.body, media: locationUrl });
        newMedia
          .save()
          .then(user => {
            res.json({ message: 'User created successfully', user });
          })
          .catch(err => {
            console.log('Error occured while trying to save to DB');
          });
      }
    });
  }
};

module.exports = upload;