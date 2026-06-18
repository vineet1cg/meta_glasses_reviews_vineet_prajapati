const { Router } = require('express');
const searchController = require('../controllers/search.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.get('/', searchController.searchGeneral);
router.get('/title', searchController.searchByTitle);
router.get('/user', searchController.searchByUser);
router.get('/reviews', searchController.searchByReviewsText);
router.get('/country', searchController.searchByCountry);
router.get('/users', searchController.searchByUsers);

module.exports = router;
