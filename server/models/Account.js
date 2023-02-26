const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    account: { type: String, required: true },
    sum: { type: Number, required: true },
    comment: String,
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Account", schema);
