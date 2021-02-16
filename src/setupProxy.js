const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:60442',
      "secure": false,
      "pathRewrite": {
        "^/api": ""
      }
    })
  );
};