require("dotenv").config();
const { Sequelize } = require("sequelize");

/* Models */
const CountryModel = require('./models/Country');
const ActivityModel = require('./models/Activity')


/* Credentials */
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, 
  native: false, 
});


/* Definición de modelos*/
CountryModel(sequelize);
ActivityModel(sequelize);


/* Relaciones */
const { Country, Activity } = sequelize.models;

Country.belongsToMany(Activity, { through: "Activity_Country"});
Activity.belongsToMany(Country, { through: "Activity_Country"});

module.exports = {
  ...sequelize.models, // para importar los modelos así: const { Country, Activity } = require('./db.js');
  conn: sequelize,     // para importar la conexión { conn } = require('./db.js');
};


/* Definición de Modelos
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
 */