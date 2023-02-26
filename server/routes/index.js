const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/categoryAccount", require("./categoryAccount.routes"));
router.use("/categoryExpense", require("./categoryExpense.routes"));
router.use("/expense", require("./expense.routes"));
router.use("/income", require("./income.routes"));
router.use("/account", require("./account.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
