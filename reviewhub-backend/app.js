const express = require('express');
const cors = require('cors');
const healthRoutes = require('./src/routes/health.routes');
const authRoutes = require('./src/routes/auth.routes');
const reviewRoutes = require('./src/routes/review.routes');
const analyticsRoutes = require('./src/routes/analytics.routes');
const adminRoutes = require('./src/routes/admin.routes');
const searchRoutes = require('./src/routes/search.routes');
const statsRoutes = require('./src/routes/stats.routes');
const jwtRoutes = require('./src/routes/jwt.routes');
const protectedRoutes = require('./src/routes/protected.routes');
const profileRoutes = require('./src/routes/profile.routes');
const usersRoutes = require('./src/routes/users.routes');
const countriesRoutes = require('./src/routes/countries.routes');
const countryRoutes = require('./src/routes/country.routes');
const ratingsRoutes = require('./src/routes/ratings.routes');
const verifiedRoutes = require('./src/routes/verified.routes');
const compareRoutes = require('./src/routes/compare.routes');
const logger = require('./src/middlewares/logger.middleware');
const errorHandler = require('./src/middlewares/error.middleware');
const rateLimiter = require('./src/middlewares/rateLimiter.middleware');

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(logger);

// Mount health routes globally at root as well
app.use('/', healthRoutes);

app.use('/api/v1', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/stats', statsRoutes);
app.use('/api/v1/jwt', jwtRoutes);
app.use('/api/v1/protected', protectedRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/countries', countriesRoutes);
app.use('/api/v1/country', countryRoutes);
app.use('/api/v1/ratings', ratingsRoutes);
app.use('/api/v1/verified', verifiedRoutes);
app.use('/api/v1/compare', compareRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

module.exports = app;
