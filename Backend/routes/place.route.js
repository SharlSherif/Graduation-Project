const { Router } = require('express');
const PlaceController = require('../controllers/place.controller');
// const authentication = require('../middlewares/authentication');
const router = Router();

router.post(
    '/',
    PlaceController.create
);

router.get('/', PlaceController.getData);

router.put(
    '/:id',
    PlaceController.update
);
router.delete(
    '/:id',
    PlaceController.delete
);

module.exports = router;
