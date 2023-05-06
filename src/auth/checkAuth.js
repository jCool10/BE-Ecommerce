const apiKeyModel = require('../models/apiKey.model')
const { findById } = require('../services/apiKey.service')
const crypto = require('crypto')

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
}

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()

    if (!key) {
      return res.status(403).json({
        message: 'Forbidden Error 1',
      })
    }

    const objKey = await findById(key)
    if (!objKey)
      return res.status(403).json({
        message: 'Forbidden Error 2',
      })

    req.objKey = objKey
    return next()
  } catch (error) {}
}

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: 'Permission denied',
      })
    }

    const validPermission = req.objKey.permissions.includes(permission)
    if (!validPermission)
      return res.status(403).json({
        message: 'Permission denied',
      })

    return next()
  }
}

module.exports = {
  apiKey,
  permission,
}
