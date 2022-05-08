const jwt = require('../lib/jwt');

const authHandler = async (req, res, next) => {
    try {
    const { token } = req.headers;
    const verifiedToken = await jwt.verify(token);
    req.params.tokenPayload = verifiedToken;
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token Invalido'
        });
    };
};

module.exports = authHandler;