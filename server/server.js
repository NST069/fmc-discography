const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
// const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   // we're connected!
//   console.log(`Connected to ${db.host}`);
// });

const discography = require("./routes/discography");
app.use("/discography", discography);
const videography = require("./routes/videography");
app.use("/videography", videography);
const gallery = require("./routes/gallery");
app.use("/gallery", gallery);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
