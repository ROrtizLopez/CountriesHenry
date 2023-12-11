const { Router } = require('express');
const countriesRouter = Router();

/* Import de Handlers */
const { getCountries } = require('../handlers/countries/getCountriesHandler');
const { getCountryById } = require('../handlers/countries/getByIdHandler');
const { getCountryByName } = require('../handlers/countries/getByNameHandler');

/* Redireccionamiento de rutas '/countries' */
countriesRouter.get('/', getCountries); 
countriesRouter.get('/name', getCountryByName);
countriesRouter.get('/:id', getCountryById);


module.exports = {
    countriesRouter
};