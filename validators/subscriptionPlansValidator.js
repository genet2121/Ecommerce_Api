const { body, validationResult } = require('express-validator');

const subscriptionPlanValidationRules = [
  body('subp_name')
    .notEmpty()
    .isString().withMessage('Subscription plan name is required'),

  body('des')
    .notEmpty()
    .isString().withMessage('Description is required'),

  body('price')
    .notEmpty()
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),

  body('duration_days')
    .notEmpty()
    .isInt({ gt: 0 }).withMessage('Duration in days must be a positive integer')
];

const subscriptionPlanUpdateValidationRules = [
  body('subp_name')
    .optional()
    .isString().withMessage('Subscription plan name is required'),

  body('des')
    .optional()
    .isString().withMessage('Description is required'),

  body('price')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),

  body('duration_days')
    .optional()
    .isInt({ gt: 0 }).withMessage('Duration in days must be a positive integer')
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
  subscriptionPlanUpdateValidationRules,
  validate,
};
