const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Middelwares
exports.aliasTop5Cheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage price';
  req.query.fields = 'name price ratingsAverage';
  next();
};
// Toures
exports.getAllTours = catchAsync(async (req, res) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .fieldFilter()
    .pagination();
  const tours = await features.query;

  // Response
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getOneTour = catchAsync(async (req, res) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return new AppError('Tour not found...', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      newTour,
    },
  });
});

exports.patchTour = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body);

  if (!tour) {
    return new AppError('Tour not found...', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return new AppError('Tour not found...', 404);
  }

  res.status(200).json({
    status: 'success',
    message: 'The tour has deleted...',
  });
});

exports.toursStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    { $match: { price: { $gte: 50 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        avgPrice: { $avg: '$price' },
        numTours: { $sum: 1 },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { avgPrice: 1 } },
  ]);

  if (!stats) {
    return new AppError('Something went wrong...', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
