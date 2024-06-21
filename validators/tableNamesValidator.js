const { body, validationResult } = require('express-validator');

const tableNamesValidationRules = [
  body('tab_name')
    .notEmpty()
    .isString().withMessage('Table name code is a string'),
];

const tableNamesUpdateValidationRules = [
    body('tab_name')
    .optional()
    .isString().withMessage('Table name code is a string'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  tableNamesValidationRules,
  tableNamesUpdateValidationRules,
  validate,
};
