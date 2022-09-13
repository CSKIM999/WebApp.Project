const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://146.56.132.219:5000",
      secure: false,
      changeOrigin: true,
    })
  );
};
