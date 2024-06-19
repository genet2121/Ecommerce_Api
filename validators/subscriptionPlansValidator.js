const { body, validationResult } = require('express-validator');

const subscriptionPlanValidationRules = [
  body('subp_name')
    .notEmpty()
    .withMessage('Subscription plan name is required'),
  body('des')
    .notEmpty()
    .withMessage('Description is required'),
  body('price')
    .isFloat({ gt: 0 })
    .notEmpty()
    .withMessage('Price must be greater than 0'),
  body('duration_days')
    .isInt({ gt: 0 })
    .notEmpty()
    .withMessage('Duration in days must be a positive integer')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  subscriptionPlanValidationRules,
  validate,
};
