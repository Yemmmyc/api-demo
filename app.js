const express = require("express");
const morgan = require("morgan");
const client = require("prom-client");

const app = express();
const PORT = 4000;
const HOST = "0.0.0.0"; // bind to all interfaces

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();
const register = client.register;

// Sample data
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

const products = [
  { id: 101, name: "Laptop", price: "$1200" },
  { id: 102, name: "Phone", price: "$800" },
];

// Homepage
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API Demo</title>
        <style>
          body { background-color: black; color: white; font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          h1 { color: #00ffcc; }
          a { display: inline-block; margin: 10px; padding: 10px 20px; background: #00ffcc; color: black; text-decoration: none; border-radius: 5px; font-weight: bold; }
          a:hover { background: #009977; color: white; }
        </style>
      </head>
      <body>
        <h1>🚀 API Demo Home</h1>
        <a href="/users">View Users</a>
        <a href="/products">View Products</a>
        <a href="/metrics">Prometheus Metrics</a>
      </body>
    </html>
  `);
});

// JSON API endpoints
app.get("/api/users", (req, res) => res.json(users));
app.get("/api/products", (req, res) => res.json(products));

// HTML page for Users
app.get("/users", (req, res) => {
  let rows = users.map(u => `<tr><td>${u.id}</td><td>${u.name}</td><td>${u.email}</td></tr>`).join("");
  res.send(`
    <html>
      <head>
        <title>Users</title>
        <style>
          body { background-color: black; color: white; font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          h1 { color: #00ffcc; }
          table { margin: auto; border-collapse: collapse; width: 60%; background: #222; }
          th, td { border: 1px solid #00ffcc; padding: 10px; }
          th { background: #00ffcc; color: black; }
        </style>
      </head>
      <body>
        <h1>👥 Users</h1>
        <table>
          <tr><th>ID</th><th>Name</th><th>Email</th></tr>
          ${rows}
        </table>
        <p><a href="/" style="color:#00ffcc;">⬅ Back Home</a></p>
      </body>
    </html>
  `);
});

// HTML page for Products
app.get("/products", (req, res) => {
  let rows = products.map(p => `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.price}</td></tr>`).join("");
  res.send(`
    <html>
      <head>
        <title>Products</title>
        <style>
          body { background-color: black; color: white; font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          h1 { color: #00ffcc; }
          table { margin: auto; border-collapse: collapse; width: 60%; background: #222; }
          th, td { border: 1px solid #00ffcc; padding: 10px; }
          th { background: #00ffcc; color: black; }
        </style>
      </head>
      <body>
        <h1>📦 Products</h1>
        <table>
          <tr><th>ID</th><th>Name</th><th>Price</th></tr>
          ${rows}
        </table>
        <p><a href="/" style="color:#00ffcc;">⬅ Back Home</a></p>
      </body>
    </html>
  `);
});

// Health endpoint
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`✅ API running at http://${HOST}:${PORT}`);
});
