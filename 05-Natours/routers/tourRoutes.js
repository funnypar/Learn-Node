const express = require('express');
const {
  getAllTours,
  createTour,
  getOneTour,
  patchTour,
  deleteTour,
  checkId,
  checkBody,
} = require('../controllers/tourControllers');

const tourRouter = express.Router();

// Middlewares
tourRouter.param('id', checkId);

tourRouter.route('/').get(getAllTours).post(checkBody, createTour);
tourRouter.route('/:id').get(getOneTour).patch(patchTour).delete(deleteTour);

module.exports = tourRouter;
