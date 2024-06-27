const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getOneTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      massage: 'Tour Not Found.',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(424).send('Something went wrong ...');
      } else {
        res.status(201).json({
          status: 'success',
          data: {
            tours,
          },
        });
      }
    }
  );
};

exports.patchTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      massage: 'Tour Not Found.',
    });
  } else {
    res.status(200).json({
      status: 'success',
      message: 'Tour Has Updated.',
    });
  }
};

exports.deleteTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      massage: 'Tour Not Found.',
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};
