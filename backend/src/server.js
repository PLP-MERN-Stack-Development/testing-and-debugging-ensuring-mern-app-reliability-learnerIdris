require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.send("Todo API Running"));
app.use("/api/todos", todoRoutes);

// start server (skip when imported by tests)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 API http://localhost:${PORT}`));
  });
}

module.exports = app; // for Supertest
