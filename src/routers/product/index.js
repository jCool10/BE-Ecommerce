const express = require("express");
const { authentication, authenticationV2 } = require("../../auth/auth.js");
const { asyncHandler } = require("../../helpers/asyncHandler");
const productController = require("../../controllers/product.controller");

const router = express.Router();

router.get("/search/:keySearch", asyncHandler(productController.getListSearchProduct));

router.get("", asyncHandler(productController.findAllProducts));
router.get("/:product_id", asyncHandler(productController.findProduct));

router.use(authenticationV2);

router.post("", asyncHandler(productController.createProduct));
router.post("/publish/:id", asyncHandler(productController.publishProductByShop));
router.post("/unpublish/:id", asyncHandler(productController.unpublishProductByShop));

router.patch("/:product_id", asyncHandler(productController.updateProduct));

// Query
router.get("/draft/all", asyncHandler(productController.getAllDraftsForShop));
router.get("/published/all", asyncHandler(productController.getAllPublishForShop));

module.exports = router;
