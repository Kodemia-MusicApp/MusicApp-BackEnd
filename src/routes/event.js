const express = require("express");
const router = express.Router();
const Event = require("../useCases/event");
const { authHandler } = require("../middlewares/authHandler");
const { musicianHandler } = require("../middlewares/clientHandler");
router.get("/client/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.params.tokenPayload;

    let events;
    if (id === "eventAccept") {
      events = await Event.checkEventAccept(_id);
    }
    if (id === "accepted") {
      events = await Event.eventPayment(_id);
    }
    if (id === "progress") {
      events = await Event.eventProgress(_id);
    }
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
router.get("/musician/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.params.tokenPayload;
    let events;
    if (id == "newEvent") {
      events = await Event.checkNewEvents(_id);
    }
    if (id === "progress") {
      events = await Event.eventProgresMusician(_id);
    }

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
router.get("/", authHandler, async (req, res, next) => {
  try {
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
    });
    next(error);
  }
});

router.get("/client", authHandler, async (req, res, next) => {
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
      estado,
      municipio,
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
      estado,
      municipio
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
      estado,
      municipio,
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
      estado,
      municipio,
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
module.exports = router;
