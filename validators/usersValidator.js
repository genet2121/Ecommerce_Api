const { body, validationResult } = require('express-validator');

const userValidationRules = [
  body('username')
    .notEmpty()
    .isString().withMessage('Username is required'),

  body('business_name')
    .optional(),

  body('email')
    .notEmpty()
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
    
  body('password')
    .notEmpty()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
  // body('confirm_password')
  //   .custom((value, { req }) => {
  //     if (value !== req.body.passwrd) {
  //       throw new Error('Passwords do not match');
  //     }
  //     return true;
  //   }),

  body('verified')
    .optional()
    .isBoolean().withMessage('Verified must be a boolean value'),

  body('user_type')
    .notEmpty()
    .isIn(['buyer', 'seller']).withMessage('User type must be either buyer or seller')
];

const userUpdateValidationRules = [
  body('username')
    .optional()
    .isString().withMessage('Username is required'),

  body('business_name')
    .optional(),

  body('email')
    .optional()
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
    
  body('passwrd')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  body('verified')
    .optional()
    .isBoolean().withMessage('Verified must be a boolean value'),

  body('user_type')
    .optional()
    .isIn(['buyer', 'seller']).withMessage('User type must be either buyer or seller')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  userValidationRules,
  userUpdateValidationRules,
  validate,
};
