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
    
  body('passwrd')
    .notEmpty()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  body('image')
    .notEmpty()
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Image is required.');
      }
      // Check if file type is image
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('Only JPG, JPEG, PNG, or GIF files are allowed.');
      }
      return true;
    }),

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

  body('image')
    .optional()
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Image is required.');
      }
      // Check if file type is image
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('Only JPG, JPEG, PNG, or GIF files are allowed.');
      }
      return true;
    }),

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
