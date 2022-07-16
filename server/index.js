const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const Admin = require("./models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/login-data");

app.get("/", (req, res) => {
  res.send("Hallow World");
});
app.post("/api/register", async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: password,
    });
    res.json({ status: "Ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error" });
  }
});
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return { status: "error", error: "invalid Password" };
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    res.status(200).json({ status: "ok", user: token });
  } else {
    res.status(400).json({ status: "error", user: false });
  }
});
app.post("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "invalid token" });
  }
});
app.get("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    return res.json({ status: "ok", user: user.name, quote: user.quote });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "invalid token" });
  }
});
app.post("/api/admin-login", async (req, res) => {

  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    return { status: "error", error: "invalid Password" };
  }
  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (validPassword) {
    const token = jwt.sign(
      {
        name: admin.name,
        email: admin.email,
      },
      "secret123"
    );
    res.status(200).json({ status: "ok", admin: token });
  } else {
    res.status(400).json({ status: "error", admin: false });
  }
});
app.get("/api/get-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: "ok", users: users });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", error: "No Data Here" });
  }
});
app.get("/api/delete-user/:id", async (req, res) => {
  try {
    await User.remove({ _id: req.params.id });
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/edit-user/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (user) {
      res.json({ status: "ok", user: user });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }
});
app.post("/api/edit-user", async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
});
app.listen(PORT, () => {
  console.log(`Server Start on Port ${PORT}`);
});
