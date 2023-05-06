const crypto = require('crypto')
const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const keytokenService = require('./keytoken.service')
const { createTokenPair, verifyJWT } = require('../auth/auth')
const { getInfoData } = require('../utils')
const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require('../core/error.response.js')
const { findByEmail } = require('./shop.service')
const KeyTokenService = require('./keytoken.service')

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
}

class AccessService {
  static logout = async (keyStore) => {
    const delKey = await keytokenService.removeKeyById(keyStore._id)
    console.log(delKey)
    return delKey
  }

  static handlerRefreshToken = async (refreshToken) => {
    const foundToken = await KeyTokenService.findByRefreshTokenUsed(
      refreshToken
    )

    if (foundToken) {
      const { userId, email } = await verifyJWT(
        refreshToken,
        foundToken.privateKey
      )

      console.log({ userId, email })

      await keytokenService.deleteKey(userId)
      throw new ForbiddenError('Something wrong happen!!Pls relogin ')
    }

    const holderToken = await keytokenService.findByRefreshToken(refreshToken)

    if (!holderToken) throw new AuthFailureError('Shop not registered')

    const { userId, email } = await verifyJWT(
      refreshToken,
      holderToken.privateKey
    )

    const foundShop = await findByEmail({ email })
    if (!foundShop) throw new AuthFailureError('Shop not registered')

    const tokens = await createTokenPair(
      { userId, email },
      holderToken.publicKey,
      holderToken.privateKey
    )

    await holderToken.update({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    })

    return { user: { userId, email }, token }
  }

  static login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await findByEmail({ email })
    if (!foundShop) throw new BadRequestError('Shop not registered')

    const match = bcrypt.compare(password.foundShop.password)
    if (!match) throw new AuthFailureError('Authentication error')

    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')

    const { _id: userId } = foundShop
    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    )

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
      userId,
    })

    return {
      shop: getInfoData({
        field: ['_id', 'name', 'email'],
        object: foundShop,
      }),
      tokens,
    }
  }

  static signUp = async ({ name, email, password }) => {
    // try {
    const holderShop = await shopModel.findOne({ email }).lean()

    if (holderShop) {
      throw new BadRequestError('Error: Shop already registered!')
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    })

    if (newShop) {
      // created privateKey, publicKey
      // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      //   privateKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      // });

      const privateKey = crypto.randomBytes(64).toString('hex')
      const publicKey = crypto.randomBytes(64).toString('hex')

      console.log({ privateKey, publicKey })
      const keyStore = await keytokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      })

      if (!keyStore) {
        throw new BadRequestError('Error: Public Key error')
      }

      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      )

      console.log(tokens)

      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            field: ['_id', 'name', 'email'],
            object: newShop,
          }),
          tokens,
        },
      }
    }

    return {
      code: 200,
      metadata: null,
    }
    // }
  }
}

module.exports = AccessService
