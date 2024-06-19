const { body, validationResult } = require('express-validator');

const complaintValidationRules = [
  body('topic')
    .notEmpty()
    .withMessage('Topic is required'),
  body('complainee_id')
    .isInt()
    .notEmpty()
    .withMessage('Complainee ID must be an integer'),
  body('complaint_text')
    .notEmpty()
    .withMessage('Complaint text is required')
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
  validate,
};
