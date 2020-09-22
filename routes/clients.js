var express = require('express');
var router = express.Router();
const ClientsController = require('../controllers/clients-controller');

router.get('/', ClientsController.index);
router.post('/', ClientsController.validate(), ClientsController.create);

module.exports = router;
