const { Router } = require('express');
const router = Router();

router.get('/', function(req, res) {
    res.send('Hello World')
})

router.use('/pokemons', require('./path/pokemons.js'));
router.use('/types', require('./path/types.js'));

// ====================================================

router.use('/images', require('./path/image.js'))

// ====================================================

module.exports = router;
