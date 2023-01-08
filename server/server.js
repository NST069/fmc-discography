const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

var RateLimit = require("express-rate-limit");
var limiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
});
app.use(limiter);

const discography = require("./routes/discography");
app.use("/discography", discography);
const videography = require("./routes/videography");
app.use("/videography", videography);
//const gallery = require("./routes/gallery"); //TODO: Fix deviantnode or rewrite
//app.use("/gallery", gallery);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
