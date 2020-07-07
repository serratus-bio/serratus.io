const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'https//localhost:44363',
        changeOrigin: true,
      })
    );
  }