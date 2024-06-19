const { body, validationResult } = require('express-validator');

const userAddressValidationRules = [
  body('user_id')
    .isInt()
    .notEmpty()
    .withMessage('User ID must be an integer'),
  body('address_line1')
    .notEmpty()
    .withMessage('Address Line 1 is required'),
  body('address_line2')
    .optional(),
  body('city')
    .notEmpty()
    .withMessage('City is required'),
  body('state')
    .notEmpty()
    .withMessage('State is required'),
  body('postal_code')
    .notEmpty()
    .withMessage('Postal code is required'),
  body('country')
    .notEmpty()
    .withMessage('Country is required')
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
  validate,
};
