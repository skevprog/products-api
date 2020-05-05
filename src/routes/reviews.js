const express = require('express');

const router = new express.Router();

const { Review } = require('../models');

router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
