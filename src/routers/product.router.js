const express = require("express");
const productController = require("../controllers/product.controller");
const { asyncHandler } = require("../helpers/asyncHandler");
const { authenticationV2 } = require("../auth/auth");

const router = express.Router();
//api/v1/product/
// Public Routes
router.get("/search/:keySearch", asyncHandler(productController.getListSearchProduct));
router.get("/", asyncHandler(productController.findAllProducts));
router.get("/:product_id", asyncHandler(productController.findProduct));

// Private Routes (Require Authentication)
router.use(authenticationV2);

router
  .route("/")
  .post(asyncHandler(productController.createProduct))
  .patch("/:product_id", asyncHandler(productController.updateProduct));

router.post("/publish/:id", asyncHandler(productController.publishProductByShop));
router.post("/unpublish/:id", asyncHandler(productController.unpublishProductByShop));

// Query
router.get("/draft/all", asyncHandler(productController.getAllDraftsForShop));
router.get("/published/all", asyncHandler(productController.getAllPublishForShop));

module.exports = router;
