const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3 } = require("@aws-sdk/client-s3");

const s3 = new S3({
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY,
    },
    region: "us-east-1",
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Not an image! Please upload images only.", 422), false);
    }
};

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "impulsefinance",
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, `images/${Date.now().toString()}${file.originalname}`);
        },
    }),
    fileFilter: multerFilter,
});

module.exports = upload;