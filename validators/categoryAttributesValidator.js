const { body, validationResult } = require('express-validator');

const categoryAttributeValidationRules = [
  body('category_id')
    .isInt()
    .notEmpty()
    .withMessage('Category ID must be an integer'),
  body('attribute_name')
    .notEmpty()
    .withMessage('Attribute name is required'),
  body('attribute_value')
    .notEmpty()
    .withMessage('Attribute value is required')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  categoryAttributeValidationRules,
  validate,
};
