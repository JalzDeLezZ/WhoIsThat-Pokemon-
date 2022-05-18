require("dotenv").config();
const multer = require('multer');
const router = require('express').Router();
const { s3Uploadv2 } = require("../controllers/s3Services.js");

router.get('/', async (req, res) => {
    res.send("I'm in the image route");
})
router.get('/:identity', async (req, res) => {
    const { identity } = req.params;
    res.json( {identity});
})

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const storage = multer.memoryStorage();

//MIDLEWARE FOR MULTER
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[0] === 'image') {
        cb(null, true);
    }
    else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1000000,
        files: 1
    }
})

router.post(
    '/upload',
    upload.single('myFile'),
    async (req, res) => {
        try {
            const file = req.file;
            console.log(file);
            const result = await s3Uploadv2(file);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
)

// ========== ERROR ==========
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json( { message: "File size is too large"});
        }
        else if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json( { message: "Too many files, please upload only 2"});
        }
        else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json( { message: "Unexpected file, only images are allowed"});
        }
    }
})

module.exports = router;