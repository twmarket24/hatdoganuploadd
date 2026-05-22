const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// I-allow ang CORS
app.use(cors());

// I-proxy ang lahat ng requests papuntang TikTok API
app.use('/', createProxyMiddleware({
  target: 'https://open-api.tiktokglobalshop.com',
  changeOrigin: true,
  // Ito ang pinaka-importante: ipapasa nito ang ?timestamp= nang buo
  onProxyReq: (proxyReq, req, res) => {
    console.log('Fowarding request to TikTok:', req.url);
  },
  onError: (err, req, res) => {
    console.error('May error sa proxy:', err);
    res.status(500).json({ error: 'Proxy failed', details: err.message });
  }
}));

module.exports = app;
