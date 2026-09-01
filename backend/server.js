const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.json({
    message: "DevOps Learning Project API",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
