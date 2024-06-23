// walletDetailsRoutes.js
const auth = require('../infrastructure/service/authentatication/auth');
const express = require('express');
const router = express.Router();
const walletDetailsController = require('../controllers/walletDetailsController');
const { walletDetailValidationRules, walletDetailUpdateValidationRules, validate } = require('../validators/walletDetailsValidator');

const TABLE_NAME = 'wallet_details';
router.get('/', auth.authorize('can_view', TABLE_NAME), walletDetailsController.getAllWalletDetails);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), walletDetailsController.getWalletDetailById);
router.post('/', auth.authorize('can_add', TABLE_NAME), walletDetailValidationRules, validate, walletDetailsController.createWalletDetail);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), walletDetailUpdateValidationRules, validate, walletDetailsController.updateWalletDetail);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), walletDetailsController.deleteWalletDetail);

module.exports = router;



