const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://localhost:7054',
    changeOrigin: true,
    secure : false,
}

const proxy2 = {
    target: 'https://api.sparrowsms.com',
    changeOrigin: true,
    secure : false,
}

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(proxy)
  );

  app.use(
    '/v2',
    createProxyMiddleware(proxy2)
  );

};