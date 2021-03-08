const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  author: String,
  authorId: String,
  durationText: String,
  lengthSeconds: Number,
  liveNow: Boolean,
  premiere: Boolean,
  publishedText: String,
  title: String,
  type: String,
  videoId: String,
  videoThumbnails: {
    height: Number,
    url: String,
    width: Number,
  },
  viewCount: Number,
  viewCountText: String,
});

module.exports = videoSchema;
