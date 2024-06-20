const { body, validationResult } = require('express-validator');

const complaintValidationRules = [
  body('topic')
    .notEmpty()
    .isString().withMessage('Topic is required'),

  body('complainee_id')
    .notEmpty()
    .isInt().withMessage('Complainee ID must be an integer'),

  body('complaint_text')
    .notEmpty()
    .isString().withMessage('Complaint text is required')
];

const complaintUpdateValidationRules = [
  body('topic')
    .optional()
    .isString().withMessage('Topic is required'),

  body('complainee_id')
    .optional()
    .isInt().withMessage('Complainee ID must be an integer'),

  body('complaint_text')
    .optional()
    .isString().withMessage('Complaint text is required')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  complaintValidationRules,
  complaintUpdateValidationRules,
  validate,
};
