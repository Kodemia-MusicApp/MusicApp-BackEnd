const express = require("express");
const router = express.Router();
const Event = require("../useCases/event");
const { authHandler } = require("../middlewares/authHandler");

router.get("/", authHandler, async (req, res, next) => {
  try {
    const events = await Event.getAll();
    res.json({
      success: true,
      message: "Estos son todos los eventos",
      payload: events,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;
    const events = await Event.getAllEventByClient(id);
    console.log(events);
    res.json({
      success: true,
      payload: events,
    });
  } catch (error) {
    res.json({
      success: false,
    });
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
