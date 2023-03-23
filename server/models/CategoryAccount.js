const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    color: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("CategoryAccount", schema);
