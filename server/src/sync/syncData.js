const axios = require('axios');
const { Country } = require('../db');

const URL_API = 'http://localhost:5000/countries'

/* fn syncAPItoDB
- Realiza una solicitud a la API por medio de axios y procesa los datos recibidos.
- Itera el array de countries y guarda en la base de datos sólo los datos necesarios para cada atributo del modelo 'Country'.
*/

const syncAPItoDB = async () => {
    try {
        const response = await axios.get(URL_API); 
        const countries = response.data;

        for (const country of countries){
            await Country.create({
                id: country.cca3,
                name:country.name.common.trim(),
                flagImage: country.flags.png,
                continent: country.continents[0],
                capital: country.capital && country.capital.length > 0 ? country.capital[0] : null, // Verifica que cada objeto del array de objetos cuente con la propiedad capital y que al menos tengan un elemento en su array antes de intentar acceder a country.capital[0].
                subregion: country.subregion,
                population:country.population,
            });
        }

        console.log('Countries data sync with database: successful')

    } catch (error) {
        console.error('Countries data sync with database: unsuccessful', error.message);
        throw error;
    }

};

module.exports = { syncAPItoDB };