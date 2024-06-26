const express = require('express');
const router = express.Router();
const auth = require('../infrastructure/service/authentatication/auth');
const requestLogsController = require('../controllers/requestLogsController');

const TABLE_NAME = 'receipts';
router.get('/', auth.authorize('can_view', TABLE_NAME), requestLogsController.getAllRequestLogs);
router.get('/:dates', auth.authorize('can_view', TABLE_NAME), requestLogsController.getRequestLogsByDateRange);
router.get('/:id', auth.authorize('can_view', TABLE_NAME), requestLogsController.getRequestLogById);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), requestLogsController.deleteRequestLog);

module.exports = router;
