const statsService = require('../services/stats.service');
const reviewService = require('../services/review.service');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const pagination = require('../utils/pagination');

const getAverageRating = async (req, res, next) => {
  try {
    const avgRating = await statsService.getAverageRating();
    return sendSuccess(res, 'Average rating fetched successfully', { averageRating: avgRating });
  } catch (err) {
    next(err);
  }
};

const getHighestRating = async (req, res, next) => {
  try {
    const review = await statsService.getHighestRating();
    return sendSuccess(res, 'Highest rating review fetched successfully', { review });
  } catch (err) {
    next(err);
  }
};

const getLowestRating = async (req, res, next) => {
  try {
    const review = await statsService.getLowestRating();
    return sendSuccess(res, 'Lowest rating review fetched successfully', { review });
  } catch (err) {
    next(err);
  }
};

const getCountryStats = async (req, res, next) => {
  try {
    const stats = await statsService.getCountryStats(req.params.country);
    return sendSuccess(res, `Stats for country ${req.params.country} fetched successfully`, { stats });
  } catch (err) {
    next(err);
  }
};

const getUserStats = async (req, res, next) => {
  try {
    const stats = await statsService.getUserStats(req.params.name);
    return sendSuccess(res, `Stats for user ${req.params.name} fetched successfully`, { stats });
  } catch (err) {
    next(err);
  }
};

const getPositiveReviewsStats = async (req, res, next) => {
  try {
    const stats = await statsService.getPositiveReviewsStats();
    return sendSuccess(res, 'Positive reviews stats fetched successfully', { stats });
  } catch (err) {
    next(err);
  }
};

const getNegativeReviewsStats = async (req, res, next) => {
  try {
    const stats = await statsService.getNegativeReviewsStats();
    return sendSuccess(res, 'Negative reviews stats fetched successfully', { stats });
  } catch (err) {
    next(err);
  }
};

const getTopReviewers = async (req, res, next) => {
  try {
    const reviewers = await statsService.getTopReviewers();
    return sendSuccess(res, 'Top reviewers fetched successfully', { reviewers });
  } catch (err) {
    next(err);
  }
};

const getMostHelpful = async (req, res, next) => {
  try {
    const reviews = await statsService.getMostHelpful();
    return sendSuccess(res, 'Most helpful reviews fetched successfully', { reviews });
  } catch (err) {
    next(err);
  }
};

const getVerifiedPurchasesStats = async (req, res, next) => {
  try {
    const stats = await statsService.getVerifiedPurchasesStats();
    return sendSuccess(res, 'Verified purchases stats fetched successfully', { stats });
  } catch (err) {
    next(err);
  }
};

const getReviewsStats = async (req, res, next) => {
  try {
    const { page, limit } = pagination.parse(req.query);
    const { data, total } = await reviewService.getAllReviews({
      filter: { isDeleted: false },
      skip: pagination.skip(page, limit),
      limit,
      sort: { date: -1 },
    });
    return sendSuccess(res, 'Reviews stats fetched successfully', {
      reviews: data,
      pagination: pagination.format(page, limit, total),
    });
  } catch (err) {
    next(err);
  }
};

const getMonthlyAverage = async (req, res, next) => {
  try {
    const stats = await statsService.getMonthlyAverage();
    return sendSuccess(res, 'Monthly average rating fetched successfully', { stats });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAverageRating,
  getHighestRating,
  getLowestRating,
  getCountryStats,
  getUserStats,
  getPositiveReviewsStats,
  getNegativeReviewsStats,
  getTopReviewers,
  getMostHelpful,
  getVerifiedPurchasesStats,
  getReviewsStats,
  getMonthlyAverage,
};
