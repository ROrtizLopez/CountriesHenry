const { Router } = require('express');
const activitiesRouter = Router();

/* Import de handlers */
const { createActivity } = require('../handlers/activities/createHandler');
const { getActivities } = require('../handlers/activities/getActHandler');

/* Redireccionamiento de rutas '/activities' */
activitiesRouter.post('/', createActivity);
activitiesRouter.get('/', getActivities);


module.exports = {
    activitiesRouter
};