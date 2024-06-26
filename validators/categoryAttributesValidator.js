const { body, validationResult } = require('express-validator');

const categoryAttributeValidationRules = [
  body('category_id')
    .notEmpty()
    .isInt().withMessage('Category ID must be an integer'),

  body('attribute_name')
    .notEmpty()
    .isString().withMessage('Attribute name is required'),

  // body('attribute_value')
  //   .notEmpty()
  //   .isString().withMessage('Attribute value is required')
];

const categoryAttributeUpdateValidationRules = [
  body('category_id')
    .optional()
    .isInt().withMessage('Category ID must be an integer'),

  body('attribute_name')
    .optional()
    .isString().withMessage('Attribute name is required'),
    
  // body('attribute_value')
  //   .optional()
  //   .isString().withMessage('Attribute value is required')
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
  categoryAttributeUpdateValidationRules,
  validate,
};
