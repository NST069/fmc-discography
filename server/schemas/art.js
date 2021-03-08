const mongoose = require("mongoose");

const artSchema = mongoose.Schema({
  deviationId: String,
  publishedTime: String,
  title: String,
  url: String,
  stats: { comments: Number, favourites: Number },
  author: { username: String, userId: String, userIcon: String },
  content: { height: Number, width: Number, fileSize: Number, src: String },

  isDeleted: Boolean,
  isDownloadable: Boolean,
  isMature: Boolean,
  isPublished: Boolean,
});

module.exports = artSchema;
