const models  = require('../models');
const fs = require('fs');
const { body, param, validationResult } = require('express-validator');
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  ID_INT,
  DATE_FORMAT,
  PRICE_FORMAT,
  DESCRIPTION_LENGTH
} = require('../constants/errors');

exports.validate = (method) => {
  switch (method) {
    case 'urlParameter': {
      return [
        param('carId').isInt({min: 1}).withMessage(ID_INT)
      ]
    }
    case 'create': {
     return [
       param('carId').isInt({min: 1}).withMessage(ID_INT),
       body('date').isDate({format: "YYYY-MM-DD"}).withMessage(DATE_FORMAT),
       body('price').isDecimal({decimal_digits: '1,2', max: 255}).withMessage(PRICE_FORMAT),
       body('description').isLength({min: 1}).withMessage(DESCRIPTION_LENGTH)
       ]   
    }
  }
}

exports.getAll = (req, res) => {
    models.Repatarion.findAll({
        include: ['Car'],
        order: [
          ['date', 'DESC']
        ]
      })
      .then((result) => {
          return res.status(200).send(result);
      }).catch((err) => {
          return res.status(500).send({errors: [], message: INTERNAL_SERVER_ERROR});
      });
};

exports.index = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array(), message: BAD_REQUEST});
    }
    
    models.Repatarion.findAll({
        include: ['Car'],
        where: {
          carId: req.params.carId
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

    models.Repatarion.create({date: req.body.date, price: req.body.price,
      description: req.body.description, CarId: req.params.carId})
        .then((result) => {
            return res.status(201).send(result);
        }).catch((err) => {
            return res.status(500).send({errors: [], message: INTERNAL_SERVER_ERROR});
        });
};

