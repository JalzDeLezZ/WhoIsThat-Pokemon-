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
        // let aAllPokemons = [];
        // let url = `https://pokeapi.co/api/v2/pokemon`
        // while (aAllPokemons.length < 20) {
        //     const { data } = await axios.get(url);
        //     aAllPokemons = [...aAllPokemons, ...data.results];
        //     url = data.next;
        // } 
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=2`);

        const arrayOfPromises = data.results.map(async (pI) => {
            const {data} = await axios.get(pI.url);
            return data;
        });
        const rst = await Promise.all(arrayOfPromises); // array of objects with functions inside
        const cleanApi = rst.map((pI) => {
            const {id: pok_id, name: pok_name, types, sprites, stats} = pI;
            const pok_image = sprites.other.home.front_default;
            const Types = types.map((pII) => pII.type.name);
            const statsArray = stats.map((pIII) => {
                const {base_stat, stat} = pIII;
                return {stat: stat.name, base_stat};
            });
            return { pok_id, pok_name, Types, pok_image, stats: statsArray};
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
            Types: data.types.map((pI) => pI.type.name),
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
            if (oPokemon === null) { return {errorMessage: "No se Encontró ningún Pokemon"} } 
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
        if(dataDB.length > 0){
            return dataDB;
        }
        const dataApi = await ApiDataByIdOrName(pName.toLowerCase());
        return  (dataApi.pok_id)? [dataApi] : null;
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
            
        if (!pok_name) {return res.json({errorMessage: "Pokemon name is required"});}

        
        // const oPokemon = await Pokemon.create({
        const [oPokemon, bCreated] = await Pokemon.findOrCreate({
            where: {pok_name: pok_name},
            defaults:{
                pok_name,
                pok_life,
                pok_attack,
                pok_defense,
                pok_speed,
                pok_height,
                pok_weight
            }
        });
        if (bCreated) {
            
            // let typesDb = await Type.findAll({
            //     where: {name: types}
            // })
            // res.sen(typesDb)
            
            await oPokemon.addTypes(aIdTypes)

            const oCreated = await Pokemon.findOne({
                where: {pok_name: pok_name},
                include: { model: Type, through: {attributes: []} },
            })

            // return res.json(oCreated.Types);
            return res.json(oCreated);
        }
        return res.send({errorMessage: "This Pokemons is already created"})
        
    } catch (error) { return error.message }
}

module.exports = {
    findAllPokemons,
    getPokemonById,
    getPokemonByName,
    createPokemon
}
 

/*  TEST 1
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







/* TEST 2
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


/* TEST 3
const getAllPokemonsByApy = async () => {
    try {
        let aAllPokemons = [];
        let url = `https://pokeapi.co/api/v2/pokemon`
        while (aAllPokemons.length < 30) {
            const { data } = await axios.get(url);
            aAllPokemons = [...aAllPokemons, ...data.results];
            url = data.next;
        }
        return aAllPokemons;
        /* 11111111111111111111111111111111111111
        
        for (let i= aAllPokemons.length; i < 100; i++) {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            aAllPokemons.push(data);
        }  */
        
        /* 2222222222222222222222
        
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
        // aAllPokemons = aAllPokemons.concat(data.results);

        // const {data: data2} = await axios.get(data.next);

        // aAllPokemons = aAllPokemons.concat(data2.results);

        // const {data: data3} = await axios.get(data2.next);

        // aAllPokemons = aAllPokemons.concat(data3.results);

        // const {data: data4} = await axios.get(data3.next);

        // aAllPokemons = aAllPokemons.concat(data4.results);

        // const {data: data5} = await axios.get(data4.next);

        // aAllPokemons = aAllPokemons.concat(data5.results);
    

        // aAllPokemons = data.results.concat(data2.results, data3.results, data4.results, data5.results);

        return aAllPokemons;
        
        for (let i = 1; i < aAllPokemons.length === 100; i++) {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            aAllPokemons.push(data);
        }

        for (const pIterant of data.results) {
            const { data: pData } = await axios.get(pIterant.url);
            aAllPokemons.push(pData);
        }
    } catch (error) { return error.message }
}*/