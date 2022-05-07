const { Router } = require('express');
const router = Router();

router.get('/', function(req, res) {
    res.send('Hello Bby')
})

router.use('/pokemons', require('./path/pokemons.js'));
router.use('/types', require('./path/types.js'));
module.exports = router;
