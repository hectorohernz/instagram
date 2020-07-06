const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
          target: 'https://glacial-refuge-25064.herokuapp.com',
          changeOrigin: true,
          secure: false
        })
      );
};