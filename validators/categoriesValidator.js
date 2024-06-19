const { body, validationResult } = require('express-validator');

const categoryValidationRules = [
  body('c_name')
    .notEmpty()
    .withMessage('Category name is required'),
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
  body('parent_id')
    .isInt()
    .notEmpty()
    .withMessage('Parent ID must be an integer')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  categoryValidationRules,
  validate,
};
