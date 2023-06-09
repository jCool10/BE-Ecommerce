const express = require("express");
const router = express.Router();
const { apiKey, permission } = require("../auth/checkAuth");

// check Api Key
router.use(apiKey);
// Check permission
router.use(permission("0000"));

router.use("/api/v1/discount", require("./discount.router"));
router.use("/api/v1/product", require("./product.router"));
router.use("/api/v1", require("./access.router"));

module.exports = router;
