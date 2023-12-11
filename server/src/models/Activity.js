const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo 'Activity' y sus atributos id, name, dificulty, duration y season.

module.exports = (sequelize) => {
    sequelize.define('Activity', {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.ENUM('Hiking', 'Camping', 'Safari', 'Swimming', 'Shopping', 'Skiing'),
            allowNull: false,
        },

        difficulty:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min: 1, 
                max: 5,
            },
        },

        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        season: {
            type: DataTypes.ENUM('Summer', 'Fall', 'Winter', 'Spring'),
            allowNull: false,
        }

    });
};