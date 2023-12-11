const { Sequelize } = require('sequelize');

/* Import de model Country */
const { Country, Activity } = require('../../db');

/* fn getByNameController
- Busca un país por nombre (name) en la base de datos e incluye las actividades turísticas asociadas al país.
- Arroja un error si no encuentra un país que coincida con el nombre recibido por parámetro.
- En caso de encontrar el país, lo retorna.

- Se exporta la fn getByNameController.
*/


const getByNameController = async (name) => {

    try {
        const countryFound = await Country.findAll({
            where: {
                name: { [Sequelize.Op.iLike]: `%${name}%` } //[Sequelize.Op.iLike] -> búsqueda case-insensitive del nombre del país. 
        },
        include: {
            model: Activity,
            attributes: ['id', 'name', 'difficulty', 'duration', 'season'], // Atributos de las actividades turísticas que se incluirán en la respuesta.
            through: { attributes: [] } // No se incluyen los atributos adicionales de la tabla intermedia 'Activity_Country'
        }
        });

        if (!countryFound) {
            throw new Error(`Country '${name}' not found`);
        };
    
        return countryFound;
        
    } catch (error) {
        throw new Error(error.message);        
    }
};

module.exports = {
    getByNameController
};

