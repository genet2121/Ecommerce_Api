const { body, validationResult } = require('express-validator');

const documentValidationRules = [
  body('user_id')
    .isInt()
    .notEmpty()
    .withMessage('User ID must be an integer'),
  body('doc_type')
    .notEmpty()
    .withMessage('Document type is required'),
  body('image')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Image is required.');
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
  documentValidationRules,
  validate,
};
