/* Import de controller */
const { getById } = require('../../controllers/countries/getByIdController');

/* fn getCountryById
- Destructuring de id, dato recibido por params.
- Invoca al controller 'getById' que buscará el país que coincide con el ID recibido por params.
- Maneja la respuesta (exitosa/error).
    - En caso de encontrar el país -> Retorna una respuesta con status code 200 y el país encontrado en formato JSON.
    - Bloque catch: Retorna una respuesta con status code 404 (Not Found) y el mensaje que arrojó el controller. 

- Se exporta la fn getCountryById.
*/

const getCountryById = async (req, res) => {
    const { id } = req.params;

    try {
        const countryFound = await getById(id);
        return res.status(200).json(countryFound);
        
    } catch (error) {
        return res.status(404).json({ error: error.message})
    }
};

module.exports = {
    getCountryById
};