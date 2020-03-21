const { Router } = require('express');
const PlaceController = require('../controllers/place.controller');
const authenticate = require('../middlewares/check-auth')
const router = Router();

router.post(
    '/',
    (req, res, next) => authenticate(req, res, next, false, true), // must be seller
    PlaceController.create
);

router.get('/', PlaceController.getData);

router.put(
    '/:id',
    (req, res, next) => authenticate(req, res, next, false, true), // must be seller
    PlaceController.update
);
router.get(
    '/rent/:id',
    (req, res, next) => authenticate(req, res, next, false, true), // must be seller
    PlaceController.rent
);
router.delete(
    '/:id',
    (req, res, next) => authenticate(req, res, next, false, true), // must be seller
    PlaceController.delete
);

module.exports = router;
