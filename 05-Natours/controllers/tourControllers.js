const Tour = require('../models/tourModel');

// Middelwares
exports.aliasTop5Cheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage price';
  req.query.fields = 'name price ratingsAverage';
  next();
};
// Toures
exports.getAllTours = async (req, res) => {
  try {
    let tours;
    if (req.query) {
      // --------------------------- Filter -------------------------------------
      // Get Simple Filtered Tours
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      const queryObj = { ...req.query };
      // Delete Fields
      const excludedFields = ['page', 'fields', 'sort', 'limit'];
      excludedFields.forEach((el) => delete queryObj[el]);
      // Replace Operators
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lt|lte)\b/g,
        (match) => `$${match}`,
      );
      let query = Tour.find(JSON.parse(queryStr));
      // --------------------------- Sort ----------------------------------------
      if (req.query.sort) {
        const sortQuery = req.query.sort.split(',').join(' ');
        query = query.sort(sortQuery);
      } else {
        query = query.sort('-createdAt');
      }
      // --------------------------- Field ---------------------------------------
      if (req.query.fields) {
        const fieldsQuery = req.query.fields.split(',').join(' ');
        query = query.select(fieldsQuery);
      } else {
        query = query.select('-__v');
      }
      // --------------------------- Pagination ----------------------------------
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 100;
      const skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit);

      // handel empty page
      if (req.query.page) {
        const countDocs = await Tour.countDocuments();
        if (skip >= countDocs) throw new Error('The Page Is Not Exist...');
      }

      // --------------------------- Await ---------------------------------------
      tours = await query;
    } else {
      // Get All Tours
      tours = await Tour.find();
    }

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: 'Something went wrong...',
    });
  }
};

exports.getOneTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: 'Something went wrong...',
    });
  }
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
      massege: 'Something went wrong...',
    });
  }
};

exports.patchTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(204).json({
      status: 'success',
      message: 'Tour Has Updated.',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'The tour has deleted...',
    });
  } catch (err) {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};
