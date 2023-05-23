const express = require("express");
const { asyncHandler } = require("../helpers/asyncHandler");
const { authenticationV2 } = require("../auth/auth");
const DiscountController = require("../controllers/discount.controller");
const discountController = require("../controllers/discount.controller");

const router = express.Router();

router.post("/amount", asyncHandler(DiscountController.getDiscountAmount));
router.get(
  "/list_product_code",
  asyncHandler(DiscountController.getAllDiscountCodesWithProducts)
);

router.use(authenticationV2);

router.post("", asyncHandler(discountController.createDiscount));
router.get(
  "",
  asyncHandler(discountController.getAllDiscountCodesWithProducts)
);

module.exports = router;
