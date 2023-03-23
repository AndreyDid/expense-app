const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    color: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("CategoryExpense", schema);
