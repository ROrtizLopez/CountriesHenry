const server = require("./src/server");
const { conn } = require('./src/db.js');
const { syncAPItoDB } = require('./src/sync/syncData.js'); // requerimos fn para guardar los datos de la API en la database.
const PORT = 3001;

/* Conf Server */
    server.listen(PORT, async () => { // config para levantar el server en el puerto 3001.
      console.log(`Server listening on port ${PORT}`)

    try {
      await conn.sync({force: true });  // sincronización de Sequilize con Database.
      console.log('Database sync: successful');

      await syncAPItoDB(); // ejecución de fn que guarda los datos de la API en la database.
      
    } catch (error) {
      console.error('Database sync: unsuccessful', error);      
    }
    });

