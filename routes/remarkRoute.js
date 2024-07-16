
const express = require('express');
const router = express.Router();
const RemarksController = require('../controllers/remarksController');


router.get('/', RemarksController.getAllRemarks);
router.get('/:id', RemarksController.getRemarkById);
router.post('/', RemarksController.createRemark);
router.put('/:id', RemarksController.updateRemark);
router.delete('/:id', RemarksController.deleteRemark);

module.exports = router;


