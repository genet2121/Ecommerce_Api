const express = require('express');
const router = express.Router();
const FaqsController = require('../controllers/faqsController');

router.get('/', FaqsController.getAllFaqs);
router.get('/:id', FaqsController.getFaqById);
router.post('/', FaqsController.createFaq);
router.put('/:id', FaqsController.updateFaq);
router.delete('/:id', FaqsController.deleteFaq);

module.exports = router;
