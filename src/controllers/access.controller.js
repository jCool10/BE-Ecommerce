const { CREATED, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  handlerRefreshToken = async (req, res, next) => {
    new SuccessResponse({
      message: "Get tokens Success!",
      metadata: await AccessService.handlerRefreshTokenV2({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };

  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout Success!",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };

  signup = async (req, res, next) => {
    new CREATED({
      message: "Register OK!",
      metadata: await AccessService.signUp(req.body),
      options: { limit: 10 },
    }).send(res);
  };
}

module.exports = new AccessController();
