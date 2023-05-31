const keytokeModel = require('../models/keytoken.model');
const { Types } = require('mongoose');

class KeyTokenService {
	static createKeyToken = async ({
		userId,
		publicKey,
		privateKey,
		refreshToken,
	}) => {
		try {
			//level2
			const filter = { user: userId },
				update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken },
				options = { upsert: true, new: true };
			const tokens = await keytokeModel.findOneAndUpdate(
				filter,
				update,
				options,
			);

			return tokens ? tokens.publicKey : null;
		} catch (error) {
			return error;
		}
	};

	static findByUserId = async (userId) => {
		return await keytokeModel.findOne({ user: new Types.ObjectId(userId) });
	};

	static removeKeyById = async (id) => {
		return await keytokeModel.remove(id);
	};

	static findByRefreshTokenUsed = async (refreshToken) => {
		return await keytokeModel
			.findOne({ refreshTokenUsed: refreshToken })
			.lean();
	};

	static findByRefreshToken = async (refreshToken) => {
		return await keytokeModel.findOne({ refreshToken });
	};

	static deleteKey = async (userId) => {
		return await keytokeModel.deleteOne({ user: Types.ObjectId(userId) });
	};
}

module.exports = KeyTokenService;
