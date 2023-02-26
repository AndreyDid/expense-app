const express = require("express");
const auth = require("../middleware/auth.middleware");
const Account = require("../models/Account");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Account.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newAccount = await Account.create({
        ...req.body,
        userId: req.user._id,
        type: "account",
      });
      res.status(201).send(newAccount);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });
router.patch("/:accountId", auth, async (req, res) => {
  try {
    const { accountId } = req.params;
    const findAccount = await Account.findById(accountId);
    if (findAccount.userId.toString() === req.user._id) {
      const updatedAccount = await Account.findByIdAndUpdate(
        accountId,
        req.body,
        { new: true }
      );
      res.send(updatedAccount);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:accountId", auth, async (req, res) => {
  try {
    const { accountId } = req.params;
    const removeAccount = await Account.findById(accountId);
    if (removeAccount.userId.toString() === req.user._id) {
      await removeAccount.remove();
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
