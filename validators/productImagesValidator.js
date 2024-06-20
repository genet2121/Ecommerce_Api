const { body, validationResult } = require('express-validator');

const productImageValidationRules = [
  body('product_id')
    .notEmpty()
    .isInt().withMessage('Product ID must be an integer'),

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
];

const productImageUpdateValidationRules = [
  body('product_id')
    .optional()
    .isInt().withMessage('Product ID must be an integer'),

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
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  productImageValidationRules,
  productImageUpdateValidationRules,
  validate,
};
