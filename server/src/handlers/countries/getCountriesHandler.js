/* Import de controllers */
const { getAllCountries } = require('../../controllers/countries/getCountriesController');

/* fn getCountries
- Invoca al controller 'getAllCountries' que buscará todos los países en la base de datos.
- Maneja la respuesta (exitosa/error).
    - En caso de encontrar todos los países -> Retorna una respuesta con status code 200 y un arreglo de objetos, donde cada objeto es un país, en formato JSON.
    - En caso de que la búsqueda de países no fue exitosa -> Retorna una respuesta con status code 404 (Not Found) y el mensaje que arroja el controller: "There's no countries in the database"

- Se exporta la fn getCountries.
*/

const getCountries = async (req, res) => {
    try {
        const allCountries = await getAllCountries();    
        return res.status(200).json(allCountries); 

    } catch (error) {
        return res.status(404).json({ error: error.message}); 
    }
};


module.exports = {
    getCountries,
};