const express = require("express");
const router = express.Router();
const Event = require("../useCases/event");
const { authHandler } = require("../middlewares/authHandler");

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

router.get("/client/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;
    const events = await Event.getEventByClient(id);
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
    const events = await Event.getEventByMusician(id);
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

router.patch("/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventUpdate = await Event.patch(id, { ...req.body });
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

router.post("/", authHandler, async (req, res, next) => {
  try {
    const {
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
    } = req.body;
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
      musicoId
    );
    res.json({
      success: true,
      message: "Evento creado exitosamente",
      payload: eventCreated,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      localizacion,
      descripcion,
      fechaInicio,
      horaInicio,
      fechaFinalizacion,
      horaFinalizacion,
      pago,
    } = req.body;
    const updatedEvent = await Event.update(id, {
      titulo,
      localizacion,
      descripcion,
      fechaInicio,
      horaInicio,
      fechaFinalizacion,
      horaFinalizacion,
      pago,
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
