const { Router } = require('express');

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'ReviewHub API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

router.get('/version', (_req, res) => {
  res.json({
    success: true,
    version: '1.0.0',
    name: 'ReviewHub API',
  });
});

module.exports = router;
