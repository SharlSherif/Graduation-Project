const { Router } = require('express');
const UserController = require('../controllers/user.controller');
// const authentication = require('../middlewares/authentication');
const router = Router();

router.post('/apply', UserController.applyToBeSeller)
router.get('/', UserController.getData);

router.put(
    '/:id',
    UserController.update
);
router.delete(
    '/:id',
    UserController.delete
);

module.exports = router;
