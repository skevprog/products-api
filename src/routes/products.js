const express = require('express');

const router = new express.Router();

const { Product, Review } = require('../models');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/products', async (req, res) => {
  try {
    const { name, price, onSale } = req.body;
    const product = new Product({ name, price, onSale });
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Creates the review for the given product
router.post('/products/:id', async (req, res) => {
  try {
    const {
      body: { stars, review },
      params: { id: _id },
    } = req;
    const productReview = await Review.create({ stars, review });
    const o = await Product.findOneAndUpdate({ _id }, { review: productReview._id }, { new: true }).exec();
    res.status(201).send(o);
  } catch (error) {
    res.status(500).send(`Something went wrong => ${error}`);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
      return res.status(400).send('Product not found');
    }
    // execPopulate returns a promise
    await product.populate('review').execPopulate();
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(`Something went wrong => ${error}`);
  }
});

module.exports = router;
