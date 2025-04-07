const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Route for the homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Home.html"));
});

// SSL Certificate Configuration
const sslOptions = {
    key: fs.readFileSync("certs/private-key.pem"),
    cert: fs.readFileSync("certs/certificate.pem")
};

// Start HTTPS Server
https.createServer(sslOptions, app).listen(8443, () => {
    console.log("✅ HTTPS Server running at https://localhost:8443/");
});

// Start HTTP Server (Redirect to HTTPS)
app.listen(80, () => {
    console.log("🌐 HTTP Server running at http://localhost/");
});
