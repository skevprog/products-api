const express = require('express');
const sharp = require('sharp');
const fs = require('fs');

const router = new express.Router();
const { ErrorHandler } = require('../middlewares/error');
const { Product, Review } = require('../models');
const upload = require('../middlewares/upload');

router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.find().exec();
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/products',
  upload.single('productImage'),
  async (req, res, next) => {
    try {
      const { name, price, onSale } = req.body;
      if (!req.file) {
        throw new ErrorHandler(400, 'Please provide an image');
      }
      // Resize the image
      const imgFolder = `uploads/${req.file.filename}`;
      await sharp(req.file.path)
        .resize(200)
        .toFormat('png')
        .toFile(imgFolder);
      // Delete the orignal file
      fs.unlink(req.file.path, err => {
        if (err) throw new ErrorHandler(500, err);
      });
      const product = new Product({ name, price, onSale, productImage: imgFolder });
      await product.save();
      res.status(201).send(product);
    } catch (error) {
      next(error);
    }
  },
  (err, req, res, next) => {
    throw new ErrorHandler(400, err.message);
  }
);

// Creates the review for the given product
router.post('/products/:id', async (req, res, next) => {
  try {
    const {
      body: { stars, review },
      params: { id: _id },
    } = req;
    const productReview = await Review.create({ stars, review });
    const o = await Product.findOneAndUpdate({ _id }, { review: productReview._id }, { new: true }).exec();
    res.status(201).send(o);
  } catch (error) {
    next(error);
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) throw new ErrorHandler(404, 'Product not found');
    // execPopulate returns a promise
    await product.populate('review').execPopulate();
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
