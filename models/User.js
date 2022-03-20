import mongoose from "mongoose";

const { String, ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"]
    },
    albums: [
      {
        name: {
          type: String,
          required: true
        },
        id: {
          type: ObjectId,
          ref: "Album",
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
