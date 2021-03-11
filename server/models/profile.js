var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  email: String,
  password: String,
  intrests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  name: String,
  location: String,
  designation: String,
  subscription: [{ endpoint: String, p256dh: String, auth: String }],
  points: { type: Number, default: 0 }
});
module.exports = mongoose.model("User", UserSchema);
