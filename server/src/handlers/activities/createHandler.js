/* Import de controller */
const { createController } = require('../../controllers/activities/createController');

/* fn createActivity
- Destructuring de los datos recibidos por body.
- Invoca al controller 'createController' que creará la nueva actividad.
- Maneja la respuesta (exitosa/error).
    - En caso de que no se mandaron todos los datos requeridos -> Retorna una respuesta con status code 400 (Bad request) y un mensaje que notifica que faltan datos obligatorios.
    - En caso de que se creó con éxito la actividad turística -> Retorna una respuesta con status code 201 (created) y la info de la actividad creada en formato JSON.
    - Bloque catch
        - Retorna una respuesta con status code 400 (Bad Request) y el mensaje del bloque try. 
        - Retorna una respuesta con status code 500 (Internal Server Error) y el mensaje que arrojó el controller: `Error creating new activity: ${error.message}`

- Se exporta la fn createActivity.
*/

const createActivity = async (req, res) => {
    const { name, difficulty, duration, season, countryIds } = req.body; // el id no se recibe por BODY porque se crea automaticamente en la DB. 

    try {
        if( !name || !difficulty || !duration || !season || !countryIds || countryIds.length === 0){
            return res.status(400).json({ error: 'Activity not created: required data is missing'});
        };

        const newActivity = await createController(name, difficulty, duration, season, countryIds);

        return res.status(201).json({newActivity});
        
    } catch (error) {
        if(error.name === 'SequelizeDatabaseError'){
            return res.status(500).json({ error: error.message }); 
        }  else {
            return res.status(400).json({ error: error.message});
        }         
    }
};


module.exports = {
    createActivity
};
