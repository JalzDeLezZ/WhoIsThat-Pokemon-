import {  
    GET_ALL_POKEMONS,
    GET_ALL_TYPES,
    RELOAD_LOADING,
    FILTER_POKEMONS,
    ORDER_POKEMONS,
    GET_POKEMONS_BY_NAME,
    GET_POKEMON_BY_ID,
    RELOAD_POKEMONS,
    DISPLAY_IMAGE
} from "./action";

const initialState = {
    rdcr_aAllPokemons: [],
    rdcr_aCustomPokemons: [],
    rdcr_aTypes: [],
    rdcr_bLoading: true,
    rdcr_oPkm : {},
    rdcr_aImages: [],
};
let aTemp = [];

const rootReducer = (state = initialState, action) => {
    const { type, payload, p1_DBorApi, p2_Type, p1_order, p2way} = action;
    const {rdcr_bLoading, rdcr_aAllPokemons, rdcr_aCustomPokemons} = state;
    
    switch (type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                rdcr_aAllPokemons: payload,
                rdcr_aCustomPokemons: payload,
            };
        
        case GET_ALL_TYPES:
            return {
                ...state,
                rdcr_aTypes: payload,
            };
        
        case RELOAD_LOADING:
            return {
                ...state,
                rdcr_bLoading: !rdcr_bLoading,
            };
        case FILTER_POKEMONS:
            console.log("RDCR",p1_DBorApi, p2_Type);

            if (p1_DBorApi === "OP_DB"){//11111111111111111

                aTemp = rdcr_aAllPokemons.filter(pI => {
                    let x = String(pI.pok_id).split("-");
                    return (x.length > 1) ? true : false;
                }); 

                if (p2_Type === "OP_NULL"){//2222222222222222
                    return {
                        ...state,
                        rdcr_aCustomPokemons: aTemp,
                    }
                }
                else {//2222222222222222
                    
                    aTemp = aTemp.filter(pI => { 
                        return (pI.Types.map(pII => 
                            pII.typ_name.includes(p2_Type)).includes(true)) ? true : false;
                    });
                    return {
                        ...state,
                        rdcr_aCustomPokemons: aTemp,
                    }
                }

            }
            else if (p1_DBorApi === "OP_API"){//11111111111111111
                aTemp = rdcr_aAllPokemons.filter(pI => {
                    return !isNaN(pI.pok_id);
                });
                if (p2_Type === "OP_NULL"){//2222222222222222
                    return {
                        ...state,
                        rdcr_aCustomPokemons: aTemp,
                    }
                }
                else {//2222222222222222
                    aTemp = aTemp.filter(pI => {
                        return pI.Types.some(pII =>
                            pII.includes(p2_Type));
                    });
                    return {
                        ...state,
                        rdcr_aCustomPokemons: aTemp,
                    }
                }
            }
            
            else {//11111111111111111

                if (p2_Type === "OP_NULL"){//2222222222222222
                    return {
                        ...state,
                        rdcr_aCustomPokemons: rdcr_aAllPokemons,
                    }
                }
                else {//2222222222222222

                    aTemp = rdcr_aAllPokemons.filter(pI => {
                        return pI.Types.some(pII =>
                            (pII.typ_name)? pII.typ_name.includes(p2_Type)
                            : pII.includes(p2_Type));
                    });
                    
                    return {
                        ...state,
                        rdcr_aCustomPokemons: aTemp,
                    }
                }
            }
        case GET_POKEMONS_BY_NAME: 
            return {
                ...state,
                rdcr_aCustomPokemons: payload,
            };

        case ORDER_POKEMONS:
            console.log("RDCR2222222",p1_order, p2way);
            if (p1_order === "ORD_ALPH"){
                if (p2way === "ORD_ASC"){
                    aTemp = rdcr_aCustomPokemons.sort((a, b) => {
                        if(a.pok_name.toLowerCase() < b.pok_name.toLowerCase()) return -1;
                        if(a.pok_name.toLowerCase() > b.pok_name.toLowerCase()) return 1;
                        return 0;
                    });
                }
                else if (p2way === "ORD_DSC") {
                    aTemp = rdcr_aCustomPokemons.sort((a, b) => {
                        if(a.pok_name.toLowerCase() > b.pok_name.toLowerCase()) return -1;
                        if(a.pok_name.toLowerCase() < b.pok_name.toLowerCase()) return 1;
                        return 0;
                    });
                }
                else { aTemp = rdcr_aCustomPokemons; }

                return{
                    ...state,
                    rdcr_aCustomPokemons: aTemp,
                }
            }
            else if (p1_order === "ORD_ATCK"){
                if (p2way === "ORD_ASC"){ 
                    aTemp = rdcr_aCustomPokemons.sort((a, b) => {
                        if (a.pok_attack && b.pok_attack){                        
                            return a.pok_attack-b.pok_attack;
                        }
                        else if (a.stats && b.stats){
                            return a.stats[1].base_stat - b.stats[1].base_stat;
                        }
                        return 0;
                    });
                }
                else if (p2way === "ORD_DSC") { 
                    aTemp = rdcr_aCustomPokemons.sort((a, b) => {
                        if (a.pok_attack && b.pok_attack){                        
                            return b.pok_attack-a.pok_attack;
                        }
                        else if (a.stats && b.stats){
                            return b.stats[1].base_stat - a.stats[1].base_stat;
                        }
                        return 0;
                    })
                }
                else {
                    aTemp = rdcr_aCustomPokemons;
                } 
                return {
                    ...state,
                    rdcr_aCustomPokemons: aTemp,
                }
            }
            else{
                return {
                    ...state,
                    rdcr_aCustomPokemons: rdcr_aAllPokemons,
                }
            }
        
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                rdcr_oPkm: payload,
            };

        case RELOAD_POKEMONS:
            return {
                ...state,
                rdcr_aCustomPokemons: rdcr_aAllPokemons,
            };
        case DISPLAY_IMAGE:
            return {
                ...state,
                rdcr_aImages: payload,
            };
        default:
            return state;
    }
}



export default rootReducer;


/* 
aTemp = rdcr_aAllPokemons.map((pI) => {
                    
    let x = JSON.stringify(pI.pok_id).split("-");
    console.log("RDCR",x);
        if (x.length > 1){
            return pI;
        }
    }
);


// other 
    return a.pok_name.localeCompare(b.pok_name);

*/

/* 
FILTER ASC DSC

ASC
    // if(a.stats[1].base_stat < b.stats[1].base_stat) return -1;
    // if(a.stats[1].base_stat > b.stats[1].base_stat) return 1;
    // return 0;
DSC
    // if(a.stats[1].base_stat > b.stats[1].base_stat) return -1;
    // if(a.stats[1].base_stat < b.stats[1].base_stat) return 1;
    // return 0;

*/