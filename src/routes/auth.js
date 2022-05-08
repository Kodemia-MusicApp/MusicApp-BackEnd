const express = require('express');
const group = require('../useCases/group');
const jwt = require('../lib/jwt');
const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        const { correo, password } = req.body;
        const retrievedUser = await group.getByEmail(correo);
        const isMatch = await group.autenticate(retrievedUser, password);
        if (isMatch) {
            const token = await jwt.sign({
                sub: retrievedUser._id,
            });
            res.json({
                success: true,
                message: 'Login exitoso',
                payload: token,
            });
        } else {
            res.status(403)
            .json({
                success: false,
                message: 'correo o contraseña incorrectos',
            });
        };
    } catch (error) {
        next(error);
    }
});

module.exports = router;