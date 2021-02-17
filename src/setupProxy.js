const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:56938',
      "secure": false,
      "pathRewrite": {
        "^/api": ""
      }
    })
  );
};