const express = require('express');
const router = express.Router();
const CarsController = require('../controllers/cars-controller');

router.get('/:clientId', CarsController.validate('urlParameter'), CarsController.index);
router.post('/:clientId', CarsController.validate('create'), CarsController.create);

module.exports = router;
