import { GET_COUNTRIES, GET_COUNTRY_NAME, CLEAR_SEARCH, APPLY_FILTERS, RESET_FILTERS, GET_ACTIVITIES } from "./action-types";

const initialState = {
    allCountries: [],
    copyCountries: [],
    byName: [],
    allActivities: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                copyCountries: action.payload,
                byName:[] 
            }
        case GET_COUNTRY_NAME:
            return {
                ...state,
                byName: action.payload
            }
        case CLEAR_SEARCH:
            return{
                ...state,
                byName: [] // limpia el edo de la busqueda al cargar todos los paises
            }
        case GET_ACTIVITIES:
            return{
                ...state,
                allActivities: action.payload,
                copyActivities: action.population,          
            }
        case APPLY_FILTERS:
            let filteredCountries = [...state.copyCountries];

            // Filtrado por continente
            if(action.payload.filterContinent) {
                filteredCountries = filteredCountries.filter((country) => country.continent === action.payload.filterContinent);
            }

            // Filtrado por actividad
            if(action.payload.filterActivity){
                filteredCountries = filteredCountries.filter((country) => country.Activities.some((activity) => activity.name === action.payload.filterActivity))
            };

            // Ordenamiento por nombre
            if( action.payload.sortName === 'AZ' ){
                filteredCountries.sort((a,b)=> a.name.localeCompare(b.name));
            } else if (action.payload.sortName === 'ZA') {
                filteredCountries.sort((a, b) => b.name.localeCompare(a.name));
            }

            // Ordenamiento por poblacion
            if(action.payload.sortPop === 'A') {
                filteredCountries.sort((a, b) => a.population - b.population);
            } else if (action.payload.sortPop === 'D') {
                filteredCountries.sort((a, b) => b.population - a.population);
            }
            return {
                ...state,
                allCountries: filteredCountries
            }
        case RESET_FILTERS:
            return {
                ...state,
                allCountries: state.copyCountries,
            };
        default:
            return {
                ...state
            }
    }
};

export default reducer;