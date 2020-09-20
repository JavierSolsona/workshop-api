var express = require('express');
var router = express.Router();
const CarsController = require('../controllers/carsController');

router.get('/:clientId', CarsController.validate('urlParameter'), CarsController.index);
router.post('/:clientId', CarsController.validate('create'), CarsController.create);

module.exports = router;
