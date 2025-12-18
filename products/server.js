import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt"; // for password hashing

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // allow React dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pharmacy",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

// ✅ Get all products
app.get("/products", (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(Array.isArray(data) ? data : []);
  });
});

// ✅ Get one product
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM products WHERE id = ?";
  db.query(q, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ message: "Not found" });
    return res.json(rows[0]);
  });
});

// ✅ Add product
app.post("/products", (req, res) => {
  const product = req.body;

  const q = `
    INSERT INTO products SET ?
  `;

  db.query(q, product, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, ...product });
  });
});

// ✅ Update product
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = req.body;

  const q = `
    UPDATE products SET ? WHERE id = ?
  `;

  db.query(q, [product, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, ...product });
  });
});

// ✅ Delete product
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;

  const q = "DELETE FROM products WHERE id = ?";
  db.query(q, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product deleted", id });
  });
});


// ✅ Get cart items for a user
// ✅ Fixed version: Get cart items with product details
app.get("/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  const q = `
    SELECT 
      c.id AS cart_id, 
      c.user_id, 
      c.product_id, 
      c.quantity,
      p.productTitle, 
      p.thumbnail, 
      p.priceInDollar AS price, 
      p.stock
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;
  db.query(q, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ Add item to cart
app.post("/cart", (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  const checkStock = "SELECT stock FROM products WHERE id = ?";
  db.query(checkStock, [product_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: "Product not found" });

    const availableStock = rows[0].stock;

    const checkCart = "SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?";
    db.query(checkCart, [user_id, product_id], (err, cartRows) => {
      if (err) return res.status(500).json({ error: err.message });

      const existingQty = cartRows.length > 0 ? cartRows[0].quantity : 0;
      if (existingQty + quantity > availableStock) {
        return res.status(400).json({ error: "Not enough stock" });
      }

      const q = `
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?
      `;
      db.query(q, [user_id, product_id, quantity, quantity], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Item added to cart" });
      });
    });
  });
});

// ✅ Update quantity
app.put("/cart/:id", (req, res) => {
  const id = req.params.id;
  const { quantity } = req.body;
  const q = "UPDATE cart SET quantity = ? WHERE id = ?";
  db.query(q, [quantity, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Quantity updated" });
  });
});

// ✅ Remove item
app.delete("/cart/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM cart WHERE id = ?";
  db.query(q, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Item removed" });
  });
});



// ✅ Add favorite
app.post("/favorites", (req, res) => {
  const { user_id, product_id, type } = req.body;
  const q = "INSERT INTO favorites (user_id, product_id, type) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE product_id = product_id";
  db.query(q, [user_id, product_id, type], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Added to favorites" });
  });
});

// ✅ Remove favorite
app.delete("/favorites/:userId/:productId/:type", (req, res) => {
  const { userId, productId, type } = req.params;
  const q = "DELETE FROM favorites WHERE user_id = ? AND product_id = ? AND type = ?";
  db.query(q, [userId, productId, type], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Removed from favorites" });
  });
});


// ✅ Get favorites with product details
app.get("/favorites/:userId", (req, res) => {
  const userId = req.params.userId;
  const q = `
    SELECT f.id AS favorite_id, f.user_id, f.product_id, f.type,
       p.*
FROM favorites f
JOIN products p ON f.product_id = p.id
WHERE f.user_id = ?
  `;
  db.query(q, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


// ✅ Signup
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  // Hash password before storing
  const hashedPassword = bcrypt.hashSync(password, 10);

  const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(q, [username, email, hashedPassword], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Signup successful" });
  });
});



// ✅ Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = rows[0];

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // ✅ Success → return user data including role
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role, // 👈 add this
    });
  });
});


// ✅ Logout
app.post("/logout", (req, res) => {
  const { user_id } = req.body;
  const q = "UPDATE users SET logged_in = 0 WHERE id = ?";
  db.query(q, [user_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Logged out successfully" });
  });
});

app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});