/* Import de modelos */
const { Activity, Country } = require('../../db');

/* fn createController
- Crea una nueva actividad turística en la base de datos y la relaciona con los países indicados, gracias al parámetro countryIds. 
- Para relacionar la actividad turística con sus respectivos países, se utiliza un condicional que verifica primero si existen IDs de países (los cuales están guardados en un array). 
- Retorna la nueva actividad turística creada.
- Arroja un error si existe un error en la creación de la nueva actividad turística.

- Se exporta la fn createController.
*/


const createController = async (name, difficulty, duration, season, countryIds) => {

    try {

        const repeatedActivity = await Activity.findOne({
            where: {name, season, difficulty, duration}
        });

        if(repeatedActivity){
            throw new Error("The activity already exists");
        };
        
        const newActivity = await Activity.create({name, difficulty, duration, season });

        if(countryIds && countryIds.length > 0){
            const countries = await Country.findAll({
                where: { id: countryIds}
            });

            await newActivity.addCountries(countries);
        }

        return newActivity;
        
    } catch (error) {
        throw new Error(`Error creating new activity: ${error.message}`)
        
    }

};

module.exports ={
    createController
};