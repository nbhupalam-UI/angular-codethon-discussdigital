var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var QuestionSchema = new Schema({
  title: String,
  description: String,
  code: String,
  createddate: {
    type: Date,
    default: Date.now,
    required: true
  },
  modifieddate: {
    type: Date,
    default: Date.now,
    required: true
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    }
  ]
});

module.exports = mongoose.model("Question", QuestionSchema);
