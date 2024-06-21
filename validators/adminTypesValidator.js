const { body, validationResult } = require('express-validator');

const adminTypeValidationRules = [
  body('admin_type_name')
    .notEmpty()
    .isString().withMessage('Name type is a string'),
];

const adminTypeUpdateValidationRules = [
    body('admin_type_name')
    .optional()
    .isString().withMessage('Name type is a string'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  adminTypeValidationRules,
  adminTypeUpdateValidationRules,
  validate,
};
