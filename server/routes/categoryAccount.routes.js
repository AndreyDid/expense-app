const express = require("express");
const auth = require("../middleware/auth.middleware");
const CategoryAccount = require("../models/CategoryAccount");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await CategoryAccount.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newCategoryAccount = await CategoryAccount.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newCategoryAccount);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.delete("/:accountCategoryId", auth, async (req, res) => {
  try {
    const { accountCategoryId } = req.params;
    const removeCategoryAccount = await CategoryAccount.findById(
      accountCategoryId
    );
    if (removeCategoryAccount.userId.toString() === req.user._id) {
      await removeCategoryAccount.remove();
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
