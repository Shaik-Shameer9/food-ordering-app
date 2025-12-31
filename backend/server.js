const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, "..")));

// 🔗 MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "catering_db"
});

db.connect(err => {
  if (err) console.error(err);
  else console.log("MySQL Connected ✅");
});

// 📦 API
app.post("/place-order", (req, res) => {
  const {
    customer_name,
    mobile,
    address,
    delivery_date,
    delivery_time,
    meal_type,
    payment_mode,
    total_amount,
    order_items
  } = req.body;

  const sql = `
    INSERT INTO order_details
    (customer_name, mobile, address, delivery_date, delivery_time,
     meal_type, payment_mode, total_amount, order_items)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    customer_name,
    mobile,
    address,
    delivery_date,
    delivery_time,
    meal_type,
    payment_mode,
    total_amount,
    JSON.stringify(order_items)
  ], err => {
    if (err) return res.status(500).send("DB Error");
    res.send("Order saved");
  });
});

// ✅ ROOT ROUTE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(3000, () =>
  console.log("Server running → http://localhost:3000")
);
