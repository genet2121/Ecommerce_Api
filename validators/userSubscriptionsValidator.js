const { body, validationResult } = require('express-validator');

const userSubscriptionValidationRules = [
  body('user_id')
    .isInt()
    .notEmpty()
    .withMessage('User ID must be an integer'),
  body('subscription_plan_id')
    .isInt()
    .notEmpty()
    .withMessage('Subscription plan ID must be an integer'),
  body('start_date')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .toDate(),
  body('end_date')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .toDate(),
  body('status_in')
    .notEmpty()
    .isIn(['active', 'expired'])
    .withMessage('Invalid status')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  userSubscriptionValidationRules,
  validate,
};
