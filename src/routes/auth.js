const express = require("express");
const group = require("../useCases/group");
const musician = require("../useCases/musician");
const client = require("../useCases/client");
const jwt = require("../lib/jwt");
const router = express.Router();

router.post("/login/musician", async (req, res, next) => {
  try {
    const { correo, password } = req.body;
    const retrievedUser = await musician.getByEmail(correo);
    const isMatch = await musician.authenticate(retrievedUser, password);
    if (isMatch) {
      const token = await jwt.sign({
        _id: retrievedUser._id,
        type: retrievedUser.tipoMusico,
      });
      res.json({
        success: true,
        message: "Login exitoso",
        payload: [
          {
            token: token,
          },
          { id: retrievedUser._id },
          { type: retrievedUser.tipoMusico },
        ],
      });
    } else {
      res.status(403).json({
        success: false,
        message: "correo o contraseña incorrectos",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login/clients", async (req, res, next) => {
  try {
    const { correo, password } = req.body;
    const retrievedUser = await client.getByEmail(correo);
    const isMatch = await client.authenticate(retrievedUser, password);
    if (isMatch) {
      const token = await jwt.sign({
        _id: retrievedUser._id,
        type: retrievedUser.tipo,
      });
      res.json({
        success: true,
        message: "Login exitoso",
        payload: [
          {
            token: token,
          },
          {
            id: retrievedUser._id,
          },
          {
            type: retrievedUser.tipo,
          },
        ],
      });
    } else {
      res.status(403).json({
        success: false,
        message: "correo o contraseña incorrectos",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
