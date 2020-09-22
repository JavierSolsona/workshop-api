const express = require('express');
const router = express.Router();
const ClientsController = require('../controllers/clients-controller');

router.get('/', ClientsController.index);
router.post('/', ClientsController.validate(), ClientsController.create);

module.exports = router;
