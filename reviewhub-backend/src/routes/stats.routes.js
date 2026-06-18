const { Router } = require('express');
const statsController = require('../controllers/stats.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.get('/average-rating', statsController.getAverageRating);
router.get('/highest-rating', statsController.getHighestRating);
router.get('/lowest-rating', statsController.getLowestRating);
router.get('/country/:country', statsController.getCountryStats);
router.get('/user/:name', statsController.getUserStats);
router.get('/positive-reviews', statsController.getPositiveReviewsStats);
router.get('/negative-reviews', statsController.getNegativeReviewsStats);
router.get('/top-reviewers', statsController.getTopReviewers);
router.get('/most-helpful', statsController.getMostHelpful);
router.get('/verified-purchases', statsController.getVerifiedPurchasesStats);
router.get('/reviews', statsController.getReviewsStats);
router.get('/monthly-average', statsController.getMonthlyAverage);

module.exports = router;
