const router = require('express').Router();
const {
    findAllPokemons, 
    getPokemonById, 
    getPokemonByName,
    createPokemon
} = require ('../controllers/Pokemons.js')

//--ROUTES--

router.post('/', createPokemon);


router.get('/', async (req, res) => {
    const { name } = req.query;
    if(!name){
        const rst = await findAllPokemons();
        res.json(rst);
    }
    else{
        const rst = await getPokemonByName(name);
        res.json(rst);
    }
})

router.get('/:identity', async (req, res) => {
    const { identity } = req.params;
    const rst = await getPokemonById(identity)
    res.json(rst);
})


module.exports = router;
