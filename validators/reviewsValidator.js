const { body, validationResult } = require('express-validator');

const reviewValidationRules = [
  body('user_id')
    .notEmpty()
    .isInt().withMessage('User ID must be an integer'),

  body('product_id')
    .notEmpty()
    .isInt().withMessage('Product ID must be an integer'),

  body('rating')
    .notEmpty()
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

  body('comment_text')
    .optional()
    .isString().withMessage('Comment text must be a string')
];

const reviewUpdateValidationRules = [
  body('user_id')
    .optional()
    .isInt().withMessage('User ID must be an integer'),

  body('product_id')
    .optional()
    .isInt().withMessage('Product ID must be an integer'),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

  body('comment_text')
    .optional()
    .isString().withMessage('Comment text must be a string')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  reviewValidationRules,
  reviewUpdateValidationRules,
  validate,
};
