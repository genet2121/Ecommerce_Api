const { body, validationResult } = require('express-validator');

const categoryValidationRules = [
  body('c_name')
    .notEmpty()
    .isString().withMessage('Category name is required'),

  body('parent_id')
    .notEmpty()
    .isInt().withMessage('Parent ID must be an integer')
];

const categoryUpdateValidationRules = [
  body('c_name')
    .optional()
    .isString().withMessage('Category name is required'),

  body('parent_id')
    .optional()
    .isInt().withMessage('Parent ID must be an integer')
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
  categoryUpdateValidationRules,
  validate,
};
