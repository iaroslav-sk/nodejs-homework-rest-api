const express = require("express");
const mangoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const { DB_HOST, PORT = 3000 } = process.env;

mangoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => console.log(error));

const cors = require("cors");
const api = require("./routes/api");

app.use(cors());

app.use("/api/v1/contacts", express.json(), api.contacts);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  });
});
app.use((err, req, res, next) => {
  const { code = 500, message = "Server error" } = err;
  res.status(500).json({
    status: "fail",
    code,
    message,
  });
});

module.exports = app;
