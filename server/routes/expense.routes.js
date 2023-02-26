const express = require("express");
const auth = require("../middleware/auth.middleware");
const Expense = require("../models/Expense");
const Account = require("../models/Account");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Expense.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newExpense = await Expense.create({
        ...req.body,
        userId: req.user._id,
        type: "expense",
      });
      res.status(201).send(newExpense);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.patch("/:accountId", auth, async (req, res) => {
  try {
    const { accountId } = req.params;
    const findAccount = await Expense.findById(accountId);
    if (findAccount.userId.toString() === req.user._id) {
      const updatedExpense = await Expense.findByIdAndUpdate(
        accountId,
        req.body,
        { new: true }
      );
      res.send(updatedExpense);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:expenseId", auth, async (req, res) => {
  try {
    const { expenseId } = req.params;
    const removeExpense = await Expense.findById(expenseId);
    if (removeExpense.userId.toString() === req.user._id) {
      await removeExpense.remove();
      return res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
