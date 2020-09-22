const express = require('express');
const router = express.Router();
const ReparationsController = require('../controllers/reparations-controller');

router.get('/getAll', ReparationsController.getAll);
router.get('/:carId', ReparationsController.validate('urlParameter'), ReparationsController.index);
router.post('/:carId', ReparationsController.validate('create'), ReparationsController.create);

module.exports = router;
