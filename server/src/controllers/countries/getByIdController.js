const { Sequelize } = require('sequelize');

/* Import de model Country */
const { Country, Activity } = require('../../db');

/* fn getById
- Busca un país por ID en la base de datos e incluye las actividades turísticas asociadas al país.
- Arroja un error si no encuentra el país que coincida con el ID recibido. 
- Retorna el país encontrado.
- No se utiliza el método .findByPk() -> Se utiliza .findOne() para que la búsqueda sea case-insensitive.

- Se exporta la fn getById.
*/

const getById = async (id) => {

    try {
        const countryFound = await Country.findOne( {
            where: {
                id: { [Sequelize.Op.iLike]: id }
            },
            include: {
                model: Activity,
                attributes: ['id', 'name', 'difficulty', 'duration', 'season'], // Atributos de las actividades que se incluirán en la respuesta.
                through: { attributes: [] } // No se incluyen los atributos adicionales de la tabla intermedia 'Activity_Country'
            }
        });

        if (!countryFound) {
            throw new Error(`Country with ID ${id} not found`);
        }
    
        return countryFound;
        
    } catch (error) {
        throw new Error(`Error getting country details: ${error.message}`);
    }

};

module.exports = {
    getById
};