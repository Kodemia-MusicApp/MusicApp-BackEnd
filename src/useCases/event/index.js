const musician = require("../../models/musician");

const Event = require("../../models/event").model;

const create = async (
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
  aceptado
) => {
  const event = new Event({
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
    aceptado,
  });
  return await event.save();
};

const getAll = async () => {
  return await Event.find({}).exec();
};

const update = async (id, eventData) => {
  const {
    titulo,
    localizacion,
    descripcion,
    fechaInicio,
    horaInicio,
    fechaFinalizacion,
    horaFinalizacion,
    pago,
  } = eventData;
  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    {
      titulo,
      localizacion,
      descripcion,
      fechaInicio,
      horaInicio,
      fechaFinalizacion,
      horaFinalizacion,
      pago,
    },
    { new: true }
  ).exec();
  return updatedEvent;
};

const del = async (id) => {
  return await Event.findByIdAndDelete(id).exec();
};

const patch = async (id, event) => {
  return await Event.findByIdAndUpdate(id, { ...event }).exec();
};

module.exports = {
  create,
  getAll,
  update,
  del,
  patch,
};
