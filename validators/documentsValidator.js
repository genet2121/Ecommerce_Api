const { body, validationResult } = require('express-validator');

const documentValidationRules = [
  body('user_id')
    .notEmpty()
    .isInt().withMessage('User ID must be an integer'),

  body('doc_type')
    .notEmpty()
    .isString().withMessage('Document type is required'),
];

const documentUpdateValidationRules = [
  body('user_id')
    .optional()
    .isInt().withMessage('User ID must be an integer'),

  body('doc_type')
    .optional()
    .isString().withMessage('Document type is required'),
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
  documentUpdateValidationRules,
  validate,
};
