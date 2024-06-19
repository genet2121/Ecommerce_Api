const { body, validationResult } = require('express-validator');

const adminValidationRules = [
  body('firstname')
    .notEmpty()
    .withMessage('First name is required'),
  body('lastname')
    .notEmpty()
    .withMessage('Last name is required'),
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('passwrd')
    .isLength({ min: 6 })
    .notEmpty()
    .withMessage('Password must be at least 6 characters long'),
  body('photo')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Photo is required.');
      }
      // Check if file type is image
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('Only JPG, JPEG, or PNG files are allowed.');
      }
      return true;
    }).notEmpty(),
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
  validate,
};
