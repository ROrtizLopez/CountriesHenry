/* Import de controller */
const { getByNameController } = require('../../controllers/countries/getByNameController');

/* fn getCountryByName
- Destructuring de name, dato recibido por query.
- Invoca al controller 'getByNameController' que buscará el país que coincida con el nombre recibido por query.
- Maneja la respuesta (exitosa/error).
    - En caso de que no se mandaron datos por query -> Retorna una respuesta con status code 404 (Bad request) y un mensaje que avisa que no existe una solicitud por query.
    - En caso de encontrar el país -> Retorna una respuesta con status code 200 y el país encontrado en formato JSON.
    - Bloque catch: Retorna una respuesta con status code 404 (Not Found) y el mensaje que arrojó el controller: `Country '${name}' not found`.

- Se exporta la fn getCountryByName.
*/

const getCountryByName = async (req, res) => {

    const { name } = req.query;

    try {
        if(!name) return res.status(400).json({ error: 'Request per query non-existent'});

        const countryFound = await getByNameController(name.toLowerCase());
        return res.status(200).json(countryFound);
  
    } catch (error) {
        res.status(404).json({ error: error.message})
    }
};

module.exports = {
    getCountryByName
};

