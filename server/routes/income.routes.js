const express = require("express");
const auth = require("../middleware/auth.middleware");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Income.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newIncome = await Income.create({
        ...req.body,
        userId: req.user._id,
        type: "income",
      });
      res.status(201).send(newIncome);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.patch("/:accountId", auth, async (req, res) => {
  try {
    const { accountId } = req.params;
    const findIncome = await Income.findById(accountId);
    if (findIncome.userId.toString() === req.user._id) {
      const updatedIncome = await Income.findByIdAndUpdate(
        accountId,
        req.body,
        { new: true }
      );
      res.send(updatedIncome);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:incomeId", auth, async (req, res) => {
  try {
    const { incomeId } = req.params;
    const removeIncome = await Income.findById(incomeId);
    if (removeIncome.userId.toString() === req.user._id) {
      await removeIncome.remove();
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
