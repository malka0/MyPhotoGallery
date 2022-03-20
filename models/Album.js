import mongoose from "mongoose";

const { String } = mongoose.Schema.Types;

const AlbumSchema = new mongoose.Schema({
  photos: [{
    type: String
}]

});

export default mongoose.models.Album ||
  mongoose.model("Album", AlbumSchema);
