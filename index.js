const express = require("express");
const app = express();
const mongoDbServcies = require("./src/MongoDbServices");

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/login", function (req, res) {
  res.send("Hello World");
});

app.get("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const gender = req.body.gender;

  if (password !== confirmPassword) {
    res.send("Password not match!");
    return;
  }

  const data = {
    username: username,
    password: password,
    gender: gender,
  };

  try {
    const result = await mongoDbServcies.createUser(data);

    res.send(result);
  } catch (err) {
    if (err === "User exist!") {
      res.status(401).send(err);
    } else {
      res.status(500).send("Something wrong!");
    }
  }
});

app.listen(3000, () => {
  console.log("Service start at port: 3000");
});
