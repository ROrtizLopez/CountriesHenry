import axios from 'axios';

/* actions */
import { GET_COUNTRIES, GET_COUNTRY_NAME, CLEAR_SEARCH, APPLY_FILTERS, RESET_FILTERS, GET_ACTIVITIES } from "./action-types";

const URL_BASE = 'http://localhost:3001'

export const getCountries = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL_BASE}/countries`);
            const countries = response.data;
            
            return dispatch({ type: GET_COUNTRIES, payload: countries });
            
        } catch (error) {
            console.error('Error fetching countries:', error)
            throw new Error(`Error fetching countries: ${error.message}`);
        }
    }  
};

export const getCountryByName = (name) => {
    return async (dispatch) =>{
        try {
            const response = await axios.get(`${URL_BASE}/countries/name?name=${name}`);
            const countriesFound = response.data;

            return dispatch({ type: GET_COUNTRY_NAME, payload: countriesFound });
            
        } catch (error) {
            console.error('Error fetching country by name:', error)
            throw new Error(`Error fetching country by name: ${error.message}`);
        }
    }

};

export const clearSeachResult = () => {
    return (dispatch) => {
        dispatch({ type: CLEAR_SEARCH });
    }
};

export const applyFilters = (filters) => {
    return { type: APPLY_FILTERS, payload: filters} // filters is an object
};

export const resetFilters = () => {
    console.log("resetFilters action dispatched");
    return { type: RESET_FILTERS };
};

export const getActivities = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL_BASE}/activities`);
            const activities = response.data;

            console.log(`Respuesta getActivities ${activities}`);

            return dispatch({ type: GET_ACTIVITIES, payload: activities});
            
        } catch (error) {
            console.error('Error fetching activities:', error)
            throw new Error(`Error fetching activities: ${error.message}`); 
        }
    }
};







/*
export const getCountryById = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BASE_URL}/countries/${id}`);
            const countryById = response.data;

            console.log(`Respuesta getCountryById ${countryById}`);

            return dispatch({ type: GET_COUNTRY_ID, payload: countryById });
            
        } catch (error) {
            console.error('Error fetching country by ID:', error)
            throw new Error(`Error fetching country details: ${error.message}`);
        }
    }
};



*/







