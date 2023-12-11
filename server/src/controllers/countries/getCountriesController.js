/* Import de model Country */
const { Country, Activity } = require('../../db');

/* fn getAllCountries 
- Busca todos los países en la base de datos.
- Arroja un error si no existen países en la base de datos.
- Si la búsqueda de países fue exitosa, retorna todos los países encontrados. 

- Se exporta la fn getAllCountries.
*/

const getAllCountries = async () => {
    try {
        const allCountries = await Country.findAll({
            include: {
                model: Activity,
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }
        });
    
        if(!allCountries) throw new Error("There's no countries in the database");
        
        return allCountries;
        
    } catch (error) {
        throw new Error(`Error getting countries: ${error.message}`)
        
    }
};

module.exports = {
    getAllCountries,
};