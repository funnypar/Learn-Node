const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getOneTour = (req, res) => {
  // const tour = tours.find((el) => el.id === +req.params.id);

  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tours,
    // },
  });
};

exports.patchTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Tour Has Updated.',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
