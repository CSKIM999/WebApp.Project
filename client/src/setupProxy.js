const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("proxy on");
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      secure: false,
      changeOrigin: true,
    })
  );
};
