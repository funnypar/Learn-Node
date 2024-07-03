const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'The Name Must Be Insert.'],
  },
  price: {
    type: Number,
    required: [true, 'The Price Must Be Insert.'],
  },
  raiting: {
    type: Number,
    default: 4.5,
    required: [true, 'The Raiting Must Be Insert.'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
