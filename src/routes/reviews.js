const express = require('express');

const router = new express.Router();

const { Review } = require('../models');
const { ErrorHandler } = require('../middlewares/error');

router.get('/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.find().exec();
    if (!reviews) throw new ErrorHandler(200, 'No reviews to display');
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
