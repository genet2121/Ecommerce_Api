// const { body, validationResult } = require('express-validator');

// const rolesValidationRules = [
//   body('table_name_id')
//     .notEmpty()
//     .isInt().withMessage('Table name id must be an integer'),

//   body('admin_type_id')
//     .notEmpty()
//     .isInt().withMessage('Admin type id must be an integer'),

//     body('can_view')
//     .notEmpty()
//     .isInt({ min: 0, max: 1 }).withMessage('can_view must be an integer (0 or 1)'),
  
//   body('can_add')
//     .notEmpty()
//     .isInt({ min: 0, max: 1 }).withMessage('can_add must be an integer (0 or 1)'),
  
//   body('can_view_detail')
//     .notEmpty()
//     .isInt({ min: 0, max: 1 }).withMessage('can_view_detail must be an integer (0 or 1)'),
  
//   body('can_update')
//     .notEmpty()
//     .isInt({ min: 0, max: 1 }).withMessage('can_update must be an integer (0 or 1)'),
  
//   body('can_delete')
//     .notEmpty()
//     .isInt({ min: 0, max: 1 }).withMessage('can_delete must be an integer (0 or 1)')
// ];

// const rolesUpdateValidationRules = [
//   body('table_name_id')
//     .optional()
//     .isInt().withMessage('Table name id must be an integer'),

//   body('product_id')
//     .optional()
//     .isInt().withMessage('Admin type id must be an integer'),

//   body('can_view')
//     .optional()
//     .isInt({ min: 0, max: 1 }).withMessage('can_view must be an integer (0 or 1)'),
  
//   body('can_add')
//     .optional()
//     .isInt({ min: 0, max: 1 }).withMessage('can_add must be an integer (0 or 1)'),
  
//   body('can_view_detail')
//     .optional()
//     .isInt({ min: 0, max: 1 }).withMessage('can_view_detail must be an integer (0 or 1)'),
  
//   body('can_update')
//     .optional()
//     .isInt({ min: 0, max: 1 }).withMessage('can_update must be an integer (0 or 1)'),
  
//   body('can_delete')
//     .optional()
//     .isInt({ min: 0, max: 1 }).withMessage('can_delete must be an integer (0 or 1)'),
// ];

// const validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// module.exports = {
//   rolesValidationRules,
//   rolesUpdateValidationRules,
//   validate,
// };


const { body, validationResult } = require('express-validator');

const rolesValidationRules = [
  body('table_name_id')
    .notEmpty()
    .isInt().withMessage('Table name id must be an integer'),

  body('admin_type_id')
    .notEmpty()
    .isInt().withMessage('Admin type id must be an integer'),

  body('can_view')
    .notEmpty()
    .isBoolean().withMessage('can_view must be a boolean'),
  
  body('can_add')
    .notEmpty()
    .isBoolean().withMessage('can_add must be a boolean'),
  
  body('can_view_detail')
    .notEmpty()
    .isBoolean().withMessage('can_view_detail must be a boolean'),
  
  body('can_update')
    .notEmpty()
    .isBoolean().withMessage('can_update must be a boolean'),
  
  body('can_delete')
    .notEmpty()
    .isBoolean().withMessage('can_delete must be a boolean')
];

const rolesUpdateValidationRules = [
  body('table_name_id')
    .optional()
    .isInt().withMessage('Table name id must be an integer'),

  body('admin_type_id')
    .optional()
    .isInt().withMessage('Admin type id must be an integer'),

  body('can_view')
    .optional()
    .isBoolean().withMessage('can_view must be a boolean'),
  
  body('can_add')
    .optional()
    .isBoolean().withMessage('can_add must be a boolean'),
  
  body('can_view_detail')
    .optional()
    .isBoolean().withMessage('can_view_detail must be a boolean'),
  
  body('can_update')
    .optional()
    .isBoolean().withMessage('can_update must be a boolean'),
  
  body('can_delete')
    .optional()
    .isBoolean().withMessage('can_delete must be a boolean'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  rolesValidationRules,
  rolesUpdateValidationRules,
  validate,
};
