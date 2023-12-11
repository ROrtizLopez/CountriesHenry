const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo 'Country' y sus atributos id, name, flagName, continent, capital, subregion, population.
// Se desactivan las timestamps. 

module.exports = (sequelize) => {
  sequelize.define('Country', {
    id:{ 
      type: DataTypes.STRING(3),
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    flagImage: {
      type: DataTypes.STRING,
      allowNull: false,
      isUrl: true,

    },

    continent: {
      type:DataTypes.STRING,
      allowNull: true, 
    },

    capital: {
      type:DataTypes.STRING,
      allowNull: true, 
    },

    subregion:{
      type:DataTypes.STRING,
      allowNull: true, 
    },

    population:{
      type:DataTypes.INTEGER,
      allowNull: false, 
    },

  }, {timestamps: false});
};