const { Router } = require('express');
const UserController = require('../controllers/user.controller');
// const authentication = require('../middlewares/authentication');
const router = Router();

router.post('/apply', UserController.applyToBeSeller)
//? request rental from the property owner (THIS HAS TO BE APPROVED BY THE SELLER)
router.get('/rent/request/:id', UserController.rentalRequest)

router.get('/profile', UserController.profileDetails)

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
