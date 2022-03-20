import mongoose from "mongoose";


const { String, Date, Array } = mongoose.Schema.Types;

const PhotoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  // TODO: change to albums.
  tags: {
    type: Array,
    default: []
  },
  access: {
    type: String,
    default: "private",
    enum: ["private", "public", "unlisted"]
  },
  description: {
    type: String,
    default: ''
  },
  mediaUrl: {
    type: String,
    required: true
  }
});

export default mongoose.models.Photo ||
  mongoose.model("Photo", PhotoSchema);
