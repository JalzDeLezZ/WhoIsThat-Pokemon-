const axios = require('axios');

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';  
export const GET_ALL_TYPES = 'GET_ALL_TYPES';  
export const RELOAD_LOADING = 'RELOAD_LOADING';  
export const FILTER_POKEMONS = 'FILTER_POKEMONS';  
export const ORDER_POKEMONS = 'ORDER_POKEMONS';  
export const GET_POKEMONS_BY_NAME = 'GET_POKEMONS_BY_NAME';  
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';  
export const RELOAD_POKEMONS = 'RELOAD_POKEMONS';  

const URL = `http://127.0.0.1:3001`;

export const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL}/pokemons`);
            dispatch({
                type: GET_ALL_POKEMONS,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}
export const reloadPokemons = () => {
    return {
        type: RELOAD_POKEMONS,
    }
}
export const getAllTypes = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL}/types`);
            dispatch({
                type: GET_ALL_TYPES,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const ReloadLoading = () => {
    return {
        type: RELOAD_LOADING,
    }
}

export const FilterPokemons = (p1_DBorApi, p2_Type) => {
    return {
        type: FILTER_POKEMONS,
        p1_DBorApi,
        p2_Type,
    }
}

export const OrderPokemons = (p1_order, p2way) => {
    return {
        type: ORDER_POKEMONS,
        p1_order,
        p2way,
    }
}

export const getPokemonByName = (pName) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL}/pokemons?name=${pName}`);
            dispatch({
                type: GET_POKEMONS_BY_NAME,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getPokemonById = (pId) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`${URL}/pokemons/${pId}`);
            dispatch({
                type: GET_POKEMON_BY_ID,
                payload: data,
            });
        }
        catch (error) {
            console.log(error.message);
        }
    }
}