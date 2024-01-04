const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
  artist: String,
  title: String,
  imageUrl: String,
  tags: [String],
  url: String,
  id: Number,
  raw: {
    id: Number,
    art_id: Number,
    band_id: Number,
    encodings_id: Number,
    selling_band_id: Number,
  },
  itemType: String,
  tracks: [
    {
      title: String,
      artist: String,
      id: Number,
      duration: Number,
      file: String,
      trackNum: Number,
    },
  ],
  upc: String,
  isrc: String,
  releaseDate: Number,
  about: String,
  credits: String,
  label: { name: String, website: String },
  isAvailable: Boolean,
});

module.exports = albumSchema;
