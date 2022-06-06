const jsonwebtoken = require("jsonwebtoken");
const config = require("./config");

const sign = async (payload) => {
  return await jsonwebtoken.sign(payload, config.app.jwt, { expiresIn: "1h" });
};

const verify = async (token) => {
  return await jsonwebtoken.verify(token, config.app.jwt);
};

module.exports = {
  sign,
  verify,
};
