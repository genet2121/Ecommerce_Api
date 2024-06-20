const { body, validationResult } = require('express-validator');

const adminValidationRules = [
  body('firstname')
    .notEmpty()
    .isString().withMessage('First name is required'),

  body('lastname')
    .notEmpty()
    .isString().withMessage('Last name is required'),

  body('email')
    .notEmpty()
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
    
  body('passwrd')
    .notEmpty()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const adminUpdateValidationRules = [
  body('firstname')
    .optional()
    .isString().withMessage('First name is required'),

  body('lastname')
    .optional()
    .isString().withMessage('Last name is required'),

  body('email')
    .optional()
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
    
  body('passwrd')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  adminValidationRules,
  adminUpdateValidationRules,
  validate,
};
