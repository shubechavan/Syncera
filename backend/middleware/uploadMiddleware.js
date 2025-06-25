const multer = require('multer');

//storage engine

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()} -${ file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
   if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
   } else {
    cb(new Error('Only JPEG, PNG, and JPG files are allowed'), false);
   }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;