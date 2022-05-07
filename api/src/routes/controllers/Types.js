const { Type } = require("../../db.js")
const axios = require("axios");

const findAllTypes = async () => {
    // console.log("findAllTypes");
    try{
        const data = await Type.findAll();
        return data;
    } catch (error) { return error.message }
}

const createTypes = async () => {
    // console.log("createTypes");
    try{
        const {data} = await axios.get(`https://pokeapi.co/api/v2/type`);
        const aApiByType = data.results.map(pI => pI.name);

        for (const pIterant of aApiByType) {
            await Type.findOrCreate({
                where: { typ_name: pIterant },
            })
        }

        const db_data = findAllTypes();

        return db_data;

    } catch (error) { return error.message }
}

module.exports = {
    findAllTypes,
    createTypes
}