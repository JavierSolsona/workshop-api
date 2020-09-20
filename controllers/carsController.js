const models  = require('../models');
const fs = require('fs');
const { body, param, validationResult } = require('express-validator');
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  ID_INT,
  BRAND_LENGTH,
  COLOR_LENGTH,
  PLATE_LENGTH
} = require('../constants/errors');

exports.validate = (method) => {
  switch (method) {
    case 'urlParameter': {
      return [
        param('clientId').isInt({min: 1}).withMessage(ID_INT)
      ]
    }
    case 'create': {
     return [
       param('clientId').isInt({min: 1}).withMessage(ID_INT),
       body('brand').isLength({min: 1, max: 255}).withMessage(BRAND_LENGTH),
       body('color').isLength({min: 1, max: 255}).withMessage(COLOR_LENGTH),
       body('plate').isLength({min: 1, max: 255}).withMessage(PLATE_LENGTH)
       ]   
    }
  }
}

exports.index = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array(), message: BAD_REQUEST});
    }
    
    models.Car.findAll({
        where: {
          clientId: req.params.clientId
        }
      })
      .then((result) => {
          return res.status(200).send(result);
      }).catch((err) => {
          return res.status(500).send({errors: [], message: INTERNAL_SERVER_ERROR});
      });
};

exports.create = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array(), message: BAD_REQUEST});
    }

    models.Car.create({brand: req.body.brand, color: req.body.color,
      plate: req.body.plate, ClientId: req.params.clientId})
        .then((result) => {
            return res.status(201).send(result);
        }).catch((err) => {
            return res.status(500).send({errors: [], message: INTERNAL_SERVER_ERROR});
        });
};

