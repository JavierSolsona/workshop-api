const models  = require('../models');
const fs = require('fs');
const { body, param, validationResult } = require('express-validator');
const {
  NAME_LENGTH,
  RUT_LENGTH,
  EMAIL_LENGTH,
  EMAIL_FORMAT,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST
} = require('../constants/errors');

exports.validate = () => {
     return [ 
        body('name').isLength({min: 1, max: 255}).withMessage(NAME_LENGTH),
        body('rut').isLength({min: 1, max: 255}).withMessage(RUT_LENGTH),
        body('email').isLength({min: 1, max: 255}).withMessage(EMAIL_LENGTH),
        body('email').isEmail().normalizeEmail().withMessage(EMAIL_FORMAT)
       ]
}

exports.index = (req, res) => {
    models.Client.findAll()
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

    models.Client.create({name: req.body.name, rut: req.body.rut, email: req.body.email})
        .then((result) => {
            return res.status(201).send(result);
        }).catch((err) => {
            return res.status(500).send({errors: [], message: INTERNAL_SERVER_ERROR});
        });
};

