/* Express - Config Router */
const { Router } = require("express");
const router = Router();

/* Routers imports */
const { countriesRouter } = require('./countriesRouter');
const { activitiesRouter } = require('./activitiesRouter');

/* Redireccionamiento de rutas */
router.use('/countries', countriesRouter);      // '/countries'-> Ruta base para las operaciones relacionadas con los países.
router.use('/activities', activitiesRouter);   // '/activities'-> Ruta base para las operaciones relacionadas con las actividades turísticas.


module.exports = {
    router
};
