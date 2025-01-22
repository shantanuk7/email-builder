const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer configuration for image uploads
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error('Invalid file type');
            error.status = 400;
            return cb(error);
        }
        cb(null, true);
    },
});

// // Handle image upload

router.post('/uploadImage', upload.single('image'), (req, res) => {
    console.log("Got img upload request");

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    console.log(filePath);
    
    res.json({ imageUrl: filePath });
});

// Handle image upload
// router.post('/uploadImage', upload.single('image'), (req, res) => {
//     const filePath = `http://localhost:3000/uploads/${req.file.filename}`;
//     console.log(filePath);
    
//     res.json({ imageUrl: filePath });
// });


module.exports = router;
