const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});
app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
        console.log('err')
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData
      });
    }
  });
});
app.post("/api/login", (req, res) => {
  // this would usually be a Model.findOne().
  const user = {
    id: 1,
    username: "chuck",
    email: "chukwudi@gmail.com",
  };
  jwt.sign({ me: user }, "secretkey", { expiresIn: '30s' } , (err, token) => {
    res.json({
      token,
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // We want to first get out authorization header value.
  // When we send out token, we want to send it in our header.
  try {
    // Get authorization header value.
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined.
    if (typeof bearerHeader !== "undefined") {
      // split at the space
      const bearer = bearerHeader.split(" ");
      // get token from array
      const bearerToken = bearer[1];
      // set the token
      req.token = bearerToken;
    } else {
      throw new Error("forbidden");
    }
    next();
  } catch (err) {
    res.sendStatus(403);
  }
}
app.listen(8080, () => console.log("currently listening on 8080"));
