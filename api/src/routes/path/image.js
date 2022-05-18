require("dotenv").config();
const uuid = require('uuid').v4;
const multer = require('multer');
const router = require('express').Router();
const { s3Uploadv2 } = require("../controllers/s3Services.js");
const path = require('path');

// DELETE DISK STORAGE
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// router.get('/', async (req, res) => {res.send("I'm in the image route");})
// router.get('/:identity', async (req, res) => {const { identity } = req.params;res.json( {identity});})
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Storage in the local server

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/temp-images'),
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${uuid()}-${originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === 'image'){ //["image", "jpeg"]
        cb(null, true);
    }
    else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
    }
}

const fileUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1000000,
        files: 1
    }
}).single('myFile');

router.post(
    '/display',
    fileUpload,
    async (req, res) => {
        try {
            const localUrl = req.file.filename;
            res.json({routeImage: localUrl});
        } catch (error) {res.status(500).json({ error: error.message });}
    }
);


const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
        fileSize: 1000000,
        files: 1
    }
}).single('myFile');

router.post(
    '/upload',
    upload,
    async (req, res) => {
        try {
            const file = req.file
            const rst = await s3Uploadv2(file);
            console.log(rst)

            // DELETE ALL FILES IN THE TEMP FOLDER
            const files = await fs.readdirSync(path.join(__dirname, '../../public/temp-images'));

            for (const file of files) {
                await unlinkFile(path.join(__dirname, '../../public/temp-images', file));
            }
            
            res.json(rst.Location);
        } catch (error) {res.status(500).json({ error: error.message });}
    }
)




module.exports = router;


/* 

    const localUrl = req.file.filename;
    const { identity } = req.body;
    const { bucket } = process.env;
    const { key } = await s3Uploadv2(localUrl, bucket);
    res.json({routeImage: key});
            
*/