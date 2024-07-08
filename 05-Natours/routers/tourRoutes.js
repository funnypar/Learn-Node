const express = require('express');
const {
  getAllTours,
  createTour,
  getOneTour,
  patchTour,
  deleteTour,
  aliasTop5Cheap,
  toursStats,
} = require('../controllers/tourControllers');

const tourRouter = express.Router();

tourRouter.route('/stats').get(toursStats);
tourRouter.route('/top-5-cheap').get(aliasTop5Cheap, getAllTours);
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getOneTour).patch(patchTour).delete(deleteTour);

module.exports = tourRouter;
