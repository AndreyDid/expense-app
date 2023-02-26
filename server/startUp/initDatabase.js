const CategoryExpense = require("../models/CategoryExpense");
const categoryExpenseMock = require("../mock/categoryExpenses.json");

module.exports = async () => {
  const categories = await CategoryExpense.find();
  if (categories.length !== categoryExpenseMock.length) {
    await createInitialEntity(CategoryExpense, categoryExpenseMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  //
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
