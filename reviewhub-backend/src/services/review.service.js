const mongoose = require('mongoose');
const Review = require('../models/review.model');

const getLookupQuery = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { $or: [{ _id: id }, { reviewID: id }] };
  }
  return { reviewID: id };
};

const getAllReviews = async ({ filter, skip, limit, sort }) => {
  const [data, total] = await Promise.all([
    Review.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Review.countDocuments(filter),
  ]);
  return { data, total };
};

const getReviewById = async (id) => {
  return await Review.findOne({ ...getLookupQuery(id), isDeleted: false }).lean();
};

const createReview = async (payload) => {
  return await Review.create(payload);
};

const updateReview = async (id, payload) => {
  return await Review.findOneAndUpdate(
    { ...getLookupQuery(id), isDeleted: false },
    payload,
    { returnDocument: 'after', runValidators: true }
  ).lean();
};

const softDeleteReview = async (id) => {
  return await Review.findOneAndUpdate(
    { ...getLookupQuery(id), isDeleted: false },
    { isDeleted: true },
    { returnDocument: 'after' }
  ).lean();
};

const updateReviewRating = async (id, rating) => {
  return await Review.findOneAndUpdate(
    { ...getLookupQuery(id), isDeleted: false },
    { rating },
    { returnDocument: 'after', runValidators: true }
  ).lean();
};

const searchReviews = async ({ searchTerm, skip, limit }) => {
  const [data, total] = await Promise.all([
    Review.find({ $text: { $search: searchTerm }, isDeleted: false })
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limit)
      .lean(),
    Review.countDocuments({ $text: { $search: searchTerm }, isDeleted: false }),
  ]);
  return { data, total };
};

const getAllUsers = async ({ skip, limit }) => {
  const users = await Review.distinct('name', { isDeleted: false });
  const paginated = users.slice(skip, skip + limit);
  return { data: paginated, total: users.length };
};

const getAllCountries = async ({ skip, limit }) => {
  const countries = await Review.distinct('country', { isDeleted: false });
  const paginated = countries.slice(skip, skip + limit);
  return { data: paginated, total: countries.length };
};

const getRatingsData = async () => {
  return await Review.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$rating', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
};

const compareUsers = async (user1, user2) => {
  const getUserStats = async (name) => {
    const stats = await Review.aggregate([
      { $match: { name: new RegExp(name, 'i'), isDeleted: false } },
      {
        $group: {
          _id: '$name',
          totalReviews: { $sum: 1 },
          avgRating: { $avg: '$rating' },
          totalHelpful: { $sum: '$helpful' },
        },
      },
    ]);
    return stats[0] || { totalReviews: 0, avgRating: 0, totalHelpful: 0 };
  };
  const [stats1, stats2] = await Promise.all([
    getUserStats(user1),
    getUserStats(user2),
  ]);
  return { user1: stats1, user2: stats2 };
};

const compareRatings = async (rating1, rating2) => {
  const [count1, count2] = await Promise.all([
    Review.countDocuments({ rating: rating1, isDeleted: false }),
    Review.countDocuments({ rating: rating2, isDeleted: false }),
  ]);
  return { [`rating_${rating1}`]: count1, [`rating_${rating2}`]: count2 };
};

const getRandomReview = async () => {
  const count = await Review.countDocuments({ isDeleted: false });
  if (count === 0) return null;
  const random = Math.floor(Math.random() * count);
  return await Review.findOne({ isDeleted: false }).skip(random).lean();
};

const getAISummary = async () => {
  return {
    summary: 'Most users find the smart glasses highly convenient for outdoor activities, praising the hands-free capture feature. However, several users noted that the battery life could be improved and that low-light video capture quality is average.',
    sentiment: 'Predominantly positive (approx 78%)',
    keyKeywords: ['battery life', 'camera', 'hands-free', 'Wayfarer', 'video quality'],
  };
};

const getSentimentAnalysis = async () => {
  const [positive, negative] = await Promise.all([
    Review.countDocuments({ is_positive_review: 1, isDeleted: false }),
    Review.countDocuments({ is_positive_review: 0, isDeleted: false }),
  ]);
  return { positive, negative, ratio: positive / (negative || 1) };
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  softDeleteReview,
  updateReviewRating,
  searchReviews,
  getAllUsers,
  getAllCountries,
  getRatingsData,
  compareUsers,
  compareRatings,
  getRandomReview,
  getAISummary,
  getSentimentAnalysis,
};
