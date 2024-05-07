const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = './uploads/'; // Base upload path
        const firstName = req.body.firstName;
        // Create a dynamic folder name based on current date
        const folderName = firstName + new Date().toISOString().split('T')[0];
        const fullPath = path.join(uploadPath, folderName);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }

        cb(null, fullPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage }).array('images', 5); // Up to 5 images

exports.uploadImage = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: 'Error uploading files', error: err });
        }

        // Files uploaded successfully
        console.log('Files uploaded successfully' );
        next();
    });
};

