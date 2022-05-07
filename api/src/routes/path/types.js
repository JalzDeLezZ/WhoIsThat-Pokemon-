const router = require('express').Router();
const {findAllTypes, createTypes} = require ('../controllers/Types.js')


router.get('/', async (req, res) => {
    try {
        const rst = await findAllTypes();
        if (rst.length > 0) {
            res.json(rst);
        }
        else {
            const rst = await createTypes();
            res.json(rst);
        }
    } catch (error) { res.status(500).json(error.message); }
});

module.exports = router;
