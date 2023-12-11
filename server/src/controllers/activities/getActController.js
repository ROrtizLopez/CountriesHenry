/* Import de model Activity */
const { Activity, Country } = require('../../db');

/* fn getActController
- Busca todas las actividades turísticas guardadas en la base de datos e incluye los países asociados a la actividad (solo se incluyen los atributos de id y name del país).
- Arroja un error si no existen actividades turísticas en la base de datos. 
- En caso de la que búsqueda haya sido exitosa, retorna todas las actividades turísticas encontradas. 

- Se exporta la fn getActController. 
*/

const getActController = async () => {
    try {
        const allActivities = await Activity.findAll({
            include: [{
                model: Country,
                attributes:['id', 'name'],
                through: { attributes: [] }
            }]
        });

        if (!allActivities.length) {
            throw new Error('Tourist activities non-existent');
        };

        return allActivities;

    } catch (error) {
        throw new Error(`Error getting activities: ${error.message}`)
    }
};

module.exports = {
    getActController

};


