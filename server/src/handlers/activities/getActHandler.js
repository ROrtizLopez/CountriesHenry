/* Import de controllers */
const { getActController } = require('../../controllers/activities/getActController');

/* fn getActivities
- Invoca al controller 'getActController' que buscará todas las actividades turísticas guardas en la base de datos.
- Maneja la respuesta (exitosa/error).
    - En caso de que no se mandaron datos por query -> Retorna una respuesta con status code 404 (Bad request) y un mensaje que avisa que no existe una solicitud por query.
    - En caso de que existan actividades turísticas -> Retorna una respuesta con status code 200 y un arreglo de objetos, donde cada objeto es una actividad turística, en formato JSON.
    - Bloque catch: Retorna una respuesta con status code 404 (Not Found) y el mensaje que arrojó el controller.

- Se exporta la fn getActivities.
*/

const getActivities = async (req, res) => {
    try {
        const allActivities = await getActController();

        return res.status(200).json(allActivities);
        
    } catch (error) {
        return res.status(404).json({ error: error.message});         
    } 
};

module.exports = {
    getActivities
};