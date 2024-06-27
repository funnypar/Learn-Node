const express = require('express');
const {
  getAllTours,
  createTour,
  getOneTour,
  patchTour,
  deleteTour,
} = require('../controllers/tourControllers');

const tourRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getOneTour).patch(patchTour).delete(deleteTour);

module.exports = tourRouter;
