const express = require("express");
const router = express.Router();
const Event = require("../useCases/event");
const { authHandler } = require("../middlewares/authHandler");
const { musicianHandler } = require("../middlewares/clientHandler");

router.get("/", authHandler, async (req, res, next) => {
  try {
    const events = await Event.getAll();
    res.json({
      success: true,
      payload: events,
    });
  } catch (error) {
    res.json({
      success: false,
    });
    next(error);
  }
});
//aqui corregir
router.get("/client/", authHandler, async (req, res, next) => {
  try {
    const { _id } = req.params.tokenPayload;
    const events = await Event.getEventByClient(_id);
    res.json({
      success: true,
      payload: events,
    });
  } catch (error) {
    res.json({
      success: false,
    });
    next();
  }
});

router.get("/musician", authHandler, async (req, res, next) => {
  try {
    const { _id } = req.params.tokenPayload;
    const events = await Event.getEventByMusician(_id);
    res.json({
      success: true,
      payload: events,
    });
  } catch (error) {
    res.json({
      success: false,
    });
    next();
  }
});

router.get("/client/eventAccept", authHandler, async (req, res, next) => {
  try {
    const { _id } = req.params.tokenPayload;
    const eventAccept = await Event.checkEventAccept(_id);
    res.json({
      success: true,
      payload: eventAccept,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
});

router.patch("/update/:id", authHandler, async (req, res, next) => {
  try {
    const { _id } = req.params.tokenPayload;
    const { id } = req.params;
    const eventUpdate = await Event.patch(id, { ...req.body });
    if (eventUpdate !== null) {
      res.json({
        success: true,
        message: eventUpdate,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.json({
      success: false,
    });
    next(error);
  }
});

router.post("/", authHandler, async (req, res, next) => {
  try {
    const { _id } = req.params.tokenPayload;
    const {
      titulo,
      localizacion,
      descripcion,
      fechaInicio,
      horaInicio,
      fechaFinalizacion,
      horaFinalizacion,
      pago,
      musicoId,
      colonia,
      calle,
      numero,
      ciudad,
    } = req.body;
    const { clienteId } = { clienteId: _id };
    const eventCreated = await Event.create(
      titulo,
      localizacion,
      descripcion,
      fechaInicio,
      horaInicio,
      fechaFinalizacion,
      horaFinalizacion,
      pago,
      clienteId,
      musicoId,
      colonia,
      calle,
      numero,
      ciudad
    );
    res.json({
      success: true,
      message: "Evento creado exitosamente",
      payload: eventCreated,
    });
  } catch (error) {
    res.json({
      success: false,
    });
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { _id } = req.params.tokenPayload;
    const {
      titulo,
      localizacion,
      descripcion,
      fechaInicio,
      horaInicio,
      fechaFinalizacion,
      horaFinalizacion,
      pago,
      colonia,
      calle,
      numero,
      ciudad,
    } = req.body;
    const updatedEvent = await Event.update(_id, {
      titulo,
      localizacion,
      descripcion,
      fechaInicio,
      horaInicio,
      fechaFinalizacion,
      horaFinalizacion,
      pago,
      colonia,
      calle,
      numero,
      ciudad,
    });
    res.json({
      success: true,
      message: "Evento actualizado exitosamente",
      payload: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/accepted", authHandler, async (req, res, next) => {
  try {
    const { _id } = req.params.tokenPayload;
    const eventPayment = await Event.eventPayment(_id);
    res.json({
      success: true,
      payload: eventPayment,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
});

module.exports = router;
