const express = require('express');
const router = express.Router();
const Event = require('../useCases/event');

router.get('/', async (req, res, next) => {
    try {
        const events = await Event.getAll();
        res.json({
            success: true,
            message: 'Estos son todos los eventos',
            payload: events,
        });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { titulo, localizacion, descripcion, fechaInicio, horaInicio, fechaFinalizacion, horaFinalizacion, contratista, contratado, pago } = req.body;
        const eventCreated = await Event.create(titulo, localizacion, descripcion, fechaInicio, horaInicio, fechaFinalizacion, horaFinalizacion, contratista, contratado, pago);
        res.json({
            success: true,
            message: 'Evento creado exitosamente',
            payload: eventCreated,
        });
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { titulo, localizacion, descripcion, fechaInicio, horaInicio, fechaFinalizacion, horaFinalizacion, contratista, contratado, pago } = req.body;
        const updatedEvent = await Event.update(id, {
            titulo,
            localizacion,
            descripcion,
            fechaInicio,
            horaInicio,
            fechaFinalizacion,
            horaFinalizacion,
            contratista,
            contratado,
            pago,
        });
        res.jsnon({
            success: true,
            message: 'Evento actualizado exitosamente',
            payload: updatedEvent,
        });
    } catch (error) {
        next(error);
    };
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const eventDeleted = await Event.del(id);
        res.json({
            success: true,
            message: 'Evento eliminado exitosamente',
            payload: eventDeleted,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;