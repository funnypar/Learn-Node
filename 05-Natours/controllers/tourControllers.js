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

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      massege: err,
    });
  }
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
