const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    postedBy: {
      type: ObjectId,
      ref: "User"
    },
    created: {
      type: Date,
      default: Date.now
    },
    place:{
      type: String,
      required: false
    },
    // hashtags:[{
    //   type: String,
    //   required: false
    // }],
    updated: Date,
    likes: [{ type: ObjectId, ref: "User" }],
    
    comments: [
      {
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: ObjectId, ref: "User" }
      },
    ],
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", postSchema);
