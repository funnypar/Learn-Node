const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'The Name Must Be Insert.'],
      maxlength: [30, 'The Name Must Have Lower Than 30 Characters.'],
      minlength: [5, 'The Name Must Have More Than 5 Characters.'],
    },
    price: {
      type: Number,
      required: [true, 'The Price Must Be Insert.'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: `The Price (${this.price}) Must Be Grater Than Price Discount ({VALUE})! `,
      },
    },
    duration: {
      type: Number,
      required: [true, 'The Duration Must Be Insert.'],
    },
    difficulty: {
      type: String,
      required: [true, 'The Difficulty Must Be Insert.'],
      enum: {
        values: ['easy', 'difficult', 'medium'],
        message: 'Difficulty Is Either: easy, medium or difficult.',
      },
    },
    ratingsQuantity: {
      type: Number,
      default: 4.5,
      required: [true, 'The Raiting Must Be Insert.'],
      max: [5, "The Rating's quantity Must be Lower Or Equal 5."],
      min: [1, "The Rating's quantity Must be Higher Or Equal 1."],
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
    vipTour: {
      type: Boolean,
      default: false,
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

tourSchema.pre(/^find/, function (next) {
  this.find({ vipTour: { $ne: true } });
  next();
});

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
