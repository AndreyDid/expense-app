const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    account: { type: Schema.Types.ObjectId, ref: "Account" },
    category: { type: Schema.Types.ObjectId, ref: "CategoryAccount" },
    comment: String,
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    sum: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

module.exports = model("Income", schema);
