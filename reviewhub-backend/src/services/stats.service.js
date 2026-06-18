const Review = require('../models/review.model');

const getAverageRating = async () => {
  const result = await Review.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: null, avgRating: { $avg: '$rating' } } },
  ]);
  return result[0]?.avgRating || 0;
};

const getHighestRating = async () => {
  return await Review.findOne({ isDeleted: false }).sort({ rating: -1, helpful: -1 });
};

const getLowestRating = async () => {
  return await Review.findOne({ isDeleted: false }).sort({ rating: 1 });
};

const getCountryStats = async (country) => {
  const result = await Review.aggregate([
    { $match: { country: new RegExp(country, 'i'), isDeleted: false } },
    {
      $group: {
        _id: '$country',
        totalReviews: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        avgHelpfulness: { $avg: '$helpfulness_score' },
      },
    },
  ]);
  return result[0] || { totalReviews: 0, avgRating: 0, avgHelpfulness: 0 };
};

const getUserStats = async (name) => {
  const result = await Review.aggregate([
    { $match: { name: new RegExp(name, 'i'), isDeleted: false } },
    {
      $group: {
        _id: '$name',
        totalReviews: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        avgHelpfulness: { $avg: '$helpfulness_score' },
      },
    },
  ]);
  return result[0] || { totalReviews: 0, avgRating: 0, avgHelpfulness: 0 };
};

const getPositiveReviewsStats = async () => {
  const result = await Review.aggregate([
    { $match: { is_positive_review: 1, isDeleted: false } },
    { $group: { _id: null, total: { $sum: 1 }, avgRating: { $avg: '$rating' } } },
  ]);
  return result[0] || { total: 0, avgRating: 0 };
};

const getNegativeReviewsStats = async () => {
  const result = await Review.aggregate([
    { $match: { is_positive_review: 0, isDeleted: false } },
    { $group: { _id: null, total: { $sum: 1 }, avgRating: { $avg: '$rating' } } },
  ]);
  return result[0] || { total: 0, avgRating: 0 };
};

const getTopReviewers = async () => {
  return await Review.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: '$name',
        totalReviews: { $sum: 1 },
        totalHelpfulAug: { $sum: '$helpful_aug' },
      },
    },
    { $sort: { totalHelpfulAug: -1 } },
    { $limit: 10 },
  ]);
};

const getMostHelpful = async () => {
  return await Review.find({ isDeleted: false }).sort({ helpful: -1 }).limit(10);
};

const getVerifiedPurchasesStats = async () => {
  return await Review.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$verifiedPurchase', count: { $sum: 1 } } },
  ]);
};

const getMonthlyAverage = async () => {
  return await Review.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
        },
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);
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
  getMonthlyAverage,
};
