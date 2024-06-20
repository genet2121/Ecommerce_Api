const { body, validationResult } = require('express-validator');

const userAddressValidationRules = [
  body('user_id')
    .notEmpty()
    .isInt().withMessage('User ID must be an integer'),

  body('address_line1')
    .notEmpty()
    .isString().withMessage('Address Line 1 is required'),

  body('address_line2')
    .optional(),

  body('city')
    .notEmpty()
    .isString().withMessage('City is required'),

  body('state')
    .notEmpty()
    .isString().withMessage('State is required'),

  body('postal_code')
    .notEmpty()
    .isString().withMessage('Postal code is required'),

  body('country')
    .notEmpty()
    .isString().withMessage('Country is required')
];

const userAddressUpdateValidationRules = [
  body('user_id')
    .notEmpty()
    .isInt().withMessage('User ID must be an integer'),

  body('address_line1')
    .notEmpty()
    .isString().withMessage('Address Line 1 is required'),

  body('address_line2')
    .optional(),

  body('city')
    .notEmpty()
    .isString().withMessage('City is required'),

  body('state')
    .notEmpty()
    .isString().withMessage('State is required'),

  body('postal_code')
    .notEmpty()
    .isString().withMessage('Postal code is required'),

  body('country')
    .notEmpty()
    .isString().withMessage('Country is required')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  userAddressValidationRules,
  userAddressUpdateValidationRules,
  validate,
};
