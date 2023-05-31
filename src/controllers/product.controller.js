const { SuccessResponse } = require('../core/success.response');
const ProductService = require('../services/product.service');
const ProductServiceV2 = require('../services/product.service.xxx');

class ProductController {
	createProduct = async (req, res, next) => {
		new SuccessResponse({
			message: 'Create new product success',
			metadata: await ProductServiceV2.createProduct(req.body.product_type, {
				...req.body,
				product_shop: req.user.userId,
			}),
		}).send(res);
	};

	/**
	 * @description Get all drafts for shop
	 * @param {Number} limit
	 * @param {Number} skip
	 * @returns {JSON}
	 */
	getAllDraftsForShop = async (req, res, next) => {
		new SuccessResponse({
			message: 'Get list drafts for shop success',
			metadata: await ProductServiceV2.findAllDraftsForShop({
				product_shop: req.user.userId,
			}),
		}).send(res);
	};

	getAllPublishForShop = async (req, res, next) => {
		new SuccessResponse({
			message: 'Get list publish for shop success',
			metadata: await ProductServiceV2.findAllPublishForShop({
				product_shop: req.user.userId,
			}),
		}).send(res);
	};

	getListSearchProduct = async (req, res, next) => {
		new SuccessResponse({
			message: 'Get list search product by user success',
			metadata: await ProductServiceV2.searchProductsByUser(req.params),
		}).send(res);
	};

	updateProduct = async (req, res, next) => {
		new SuccessResponse({
			message: 'Update Product Success',
			metadata: await ProductServiceV2.updateProduct(
				req.body.product_type,
				req.params.product_id,
				{
					...req.body,
					product_shop: req.user.userId,
				},
			),
		}).send(res);
	};

	publishProductByShop = async (req, res, next) => {
		new SuccessResponse({
			message: 'Publish product by shop success',
			metadata: await ProductServiceV2.publishProductByShop({
				product_shop: req.user.userId,
				product_id: req.params.id,
			}),
		}).send(res);
	};

	unpublishProductByShop = async (req, res, next) => {
		new SuccessResponse({
			message: 'Publish product by shop success',
			metadata: await ProductServiceV2.unpublishProductByShop({
				product_shop: req.user.userId,
				product_id: req.params.id,
			}),
		}).send(res);
	};

	findAllProducts = async (req, res, next) => {
		new SuccessResponse({
			message: 'Find all product success',
			metadata: await ProductServiceV2.findAllProducts(req.query),
		}).send(res);
	};

	findProduct = async (req, res, next) => {
		new SuccessResponse({
			message: 'Find product success',
			metadata: await ProductServiceV2.findProduct({
				product_id: req.params.product_id,
			}),
		}).send(res);
	};
}

module.exports = new ProductController();
