const { Pokemon, Type } = require("../../db.js")
const axios = require("axios");
const { Op, fn, where, col} = require('sequelize');

// ================================================================
// ================================================================

const getAllPokemonsByDB = async () => {
    try {
        const data = await Pokemon.findAll({
            include: { model: Type, through: {attributes: []} }
        });
        return data;
    } catch (error) { return error.message }
}

const getAllPokemonsByApy = async () => {
    try {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`); 
        const arrayOfPromises = data.results.map(async (pI) => {
            const {data} = await axios.get(pI.url);
            return data;
        });
        // return arrayOfPromises;
        const rst = await Promise.all(arrayOfPromises); // array of objects with functions inside
        // return rst;
        const cleanApi = rst.map((pI) => {
            const {id: pok_id, name: pok_name, types, sprites, stats} = pI;
            // const {front_default: front} = sprites; // 
            const pok_image = sprites.other.home.front_default;
            const type = types.map((pII) => pII.type.name);
            const statsArray = stats.map((pIII) => {
                const {base_stat, stat} = pIII;
                return {stat: stat.name, base_stat};
            });
            return { pok_id, pok_name, type, pok_image, stats: statsArray};
        });
        return cleanApi;
    } catch (error) {return error.message}
}

const findAllPokemons = async () => {
    try {
        const db_data = await getAllPokemonsByDB();
        const api_data = await getAllPokemonsByApy();
        const rst = db_data.concat(api_data);
        return rst;
    } catch (error) { return error.message }
}

// ================================================================
// ================================================================

const ApiDataByIdOrName = async (pIdOrName) => {
    try {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pIdOrName}`); 
        const oCleanApi = {
            pok_id: data.id,
            pok_name: data.name,
            pok_image: data.sprites.other.home.front_default,
            type: data.types.map((pI) => pI.type.name),
            stats: data.stats.map((pI) => {
                const {base_stat: base, stat} = pI;
                return {stat: stat.name, base};
            }),
        };
        return oCleanApi;

    } catch (error) {return error.message}
}

const getPokemonById = async (pIdentificator) => {
    try {
        const divisions = pIdentificator.split("-");

        if (divisions.length > 1) {
            const oPokemon = await Pokemon.findByPk(pIdentificator,{
                include: { model: Type, through: {attributes: []} }}
            );
            return oPokemon;
        }
        const dataApi = await ApiDataByIdOrName(pIdentificator);
        return dataApi;

    } catch (error) {return error.message}
}

const getPokemonByName = async (pName) => {
    try {
        const dataDB = await Pokemon.findAll({
            include: { model: Type, through: {attributes: []} },
            where: {
                [Op.or]: [
                    { pok_name: { [Op.like]: `%${pName}%` } },
                    { pok_name: { [Op.like]: `%${pName.toLowerCase()}%` } },
                    { pok_name: { [Op.like]: `%${pName.toUpperCase()}%` } },
                ]
            }
        });
        const dataApi = await ApiDataByIdOrName(pName.toLowerCase());
        return dataDB.concat(dataApi);
    } catch (error) {return error.message}
}

// ================================================================
// ================================================================

const createPokemon = async (req, res) => {
    try {
        const {  
                 pok_name
                ,pok_life
                ,pok_attack
                ,pok_defense
                ,pok_speed
                ,pok_height
                ,pok_weight
                ,aIdTypes
            } = req.body;
            
        if (!pok_name) {return res.send("Pokemon name is required");}

        
        const oPokemon = await Pokemon.create({
            pok_name,
            pok_life,
            pok_attack,
            pok_defense,
            pok_speed,
            pok_height,
            pok_weight
        });

        const insertMiddleTable = await oPokemon.addTypes(aIdTypes)

        return res.json(insertMiddleTable);

    } catch (error) { return error.message }
}

module.exports = {
    findAllPokemons,
    getPokemonById,
    getPokemonByName,
    createPokemon
}
 

/* 
    const {id: pok_id, name: pok_name, types, sprites, stats} = data; // destructuring
    const pok_image = sprites.other.home.front_default;
    const type = types?.map((pII) => pII.type.name);
    const statsArray = stats.map((pIII) => {
        const {base_stat, stat} = pIII;
        return {stat: stat.name, base_stat};
    }); 
    const oPokemon = { pok_id, pok_name, type, pok_image, stats: statsArray};
    return oPokemon;
*/







/* 
 const cleanApi = rst.map((pI) => {
    const {id: pok_id, name: pok_name, types, sprites, stats} = pI;
    // const {front_default: front} = sprites; // 
    const pok_image = sprites.other.home.front_default;
    const type = types.map((pII) => pII.type.name);
    const statsArray = stats.map((pIII) => {
        const {base_stat: base, stat} = pIII;
        return {stat: stat.name, base};
    });
    return { pok_id, pok_name, type, pok_image, stats: statsArray};
});
*/