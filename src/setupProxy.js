const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      "secure": false,
      "pathRewrite": {
        "^/api": ""
      }
    })
  );
  app.use(
    '/api2',
    createProxyMiddleware({
      target: 'http://localhost:9999',
      "secure": false,
      "pathRewrite": {
        "^/api2": ""
      }
    })
  );
};