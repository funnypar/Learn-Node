const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'The Name Must Be Insert.'],
    },
    price: {
      type: Number,
      required: [true, 'The Price Must Be Insert.'],
    },
    duration: {
      type: Number,
      required: [true, 'The Duration Must Be Insert.'],
    },
    difficulty: {
      type: String,
      required: [true, 'The Difficulty Must Be Insert.'],
    },
    ratingsQuantity: {
      type: Number,
      default: 4.5,
      required: [true, 'The Raiting Must Be Insert.'],
    },
    ratingsAverage: {
      type: Number,
      default: 4,
    },
    images: [String],
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'The Group size Must Be Insert.'],
    },
    sammary: {
      type: String,
      trim: true,
      required: [true, 'The Sammary Must Be Insert.'],
    },
    description: {
      type: String,
      trim: true,
    },
    slug: String,
    imageCover: {
      type: String,
      trim: true,
      required: [true, 'The Image Must Be Insert.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
