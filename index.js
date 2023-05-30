const express = require('express');
const morgan = require("morgan");
// const https = require('https')
const { createProxyMiddleware } = require('http-proxy-middleware');

// Creating express server
const app = express();

const PORT = 8080;
const HOST = "0.0.0.0";
const API_SERVICE_URL = "https://domain.com/api"

// Logging the requests
app.use(morgan("dev"));

// Proxy Logic :  Proxy endpoints
app.use(
    "/api/*",
    createProxyMiddleware({
        target: API_SERVICE_URL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            "^/api": ""
        }
    })
);
  
// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});