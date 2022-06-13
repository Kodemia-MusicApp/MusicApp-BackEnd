const express = require("express");
const cliente = require("../useCases/client");
const jwt = require("../lib/jwt");
const { authHandler } = require("../middlewares/authHandler");
const { clientHandler } = require("../middlewares/clientHandler");

const router = express.Router();

router.get("/", authHandler, clientHandler, async (req, res, next) => {
  try {
    const { type, _id } = req.params.tokenPayload;
    const retrievedCLient = await cliente.getById(_id);
    res.json({
      success: true,
      payload: [
        {
          name: retrievedCLient.name,
          lastname: retrievedCLient.lastname,
          secondlastname: retrievedCLient.secondlastname,
          imagenusuario: retrievedCLient.imagenusuario,
          email: retrievedCLient.email,
          phone: retrievedCLient.phone,
          type: retrievedCLient.tipo,
          state: retrievedCLient.estado,
        },
      ],
    });
  } catch (error) {
    res.json({
      success: false,
    });
    next(error);
  }
});

router.get("/:id", authHandler, clientHandler, async (req, res, next) => {
  try {
    const clientes = await cliente.getAll();
    res.json({
      success: true,
      payload: clientes,
    });
  } catch (error) {
    res.json({
      success: false,
    });
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      lastname,
      secondlastname,
      password,
      email,
      phone,
      paymentmethod,
      estado,
    } = req.body;
    console.log(req.body);
    const clientCreated = await cliente.create(
      name,
      lastname,
      secondlastname,
      password,
      email,
      phone,
      paymentmethod,
      estado
    );
    const client = await cliente.getByEmail(email);
    const token = await jwt.sign({
      _id: client._id,
      type: client.tipo,
    });
    res.json({
      success: true,
      message: "Cliente created",
      payload: [
        {
          token: token,
          type: client.tipo,
          name: client.name,
          imagenusuario: client.imagenusuario,
          lastname: client.lastname,
          secondlastname: client.secondlastname,
          state: client.estado,
        },
      ],
    });
  } catch (error) {
    res.json({
      success: false,
    });
    next(error);
  }
});

router.put("/", authHandler, clientHandler, async (req, res, next) => {
  try {
    const { type, _id } = req.params.tokenPayload;
    const clienteUpdate = await cliente.update(_id, req.body);

    res.json({
      success: true,
      message: "Cliente actualizado",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "No entra",
    });
    next(error);
  }
});

module.exports = router;
