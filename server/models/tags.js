var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TagsSchema = new Schema({
  name: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
});
module.exports = mongoose.model("Tag", TagsSchema);
