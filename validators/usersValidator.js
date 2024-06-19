const { body, validationResult } = require('express-validator');

const userValidationRules = [
  body('username')
    .notEmpty()
    .withMessage('Username is required'),
  body('business_name')
    .optional(),
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('passwrd')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('image')
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
    }).notEmpty(),
  body('verified')
    .optional()
    .isBoolean()
    .withMessage('Verified must be a boolean value'),
  body('user_type')
    .isIn(['buyer', 'seller'])
    .notEmpty()
    .withMessage('User type must be either buyer or seller')
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
  validate,
};
