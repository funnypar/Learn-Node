const express = require('express');
const {
  getAllTours,
  createTour,
  getOneTour,
  patchTour,
  deleteTour,
  checkId,
} = require('../controllers/tourControllers');

const tourRouter = express.Router();

// Middlewares
tourRouter.param('id', checkId);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getOneTour).patch(patchTour).delete(deleteTour);

module.exports = tourRouter;
