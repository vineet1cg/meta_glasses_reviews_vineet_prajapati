const { Router } = require('express');
const reviewController = require('../controllers/review.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.get('/', reviewController.getVerifiedReviews);
router.get('/:status', (req, res, next) => {
  req.query.verifiedPurchase = req.params.status;
  reviewController.getAllReviews(req, res, next);
});

module.exports = router;
