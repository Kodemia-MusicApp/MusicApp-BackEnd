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
  colonia,
  calle,
  numero,
  ciudad
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
    colonia,
    calle,
    numero,
    ciudad,
  });
  return await event.save();
};

const getAll = async () => {
  return await Event.find({})
    .populate({
      path: "clienteId",
      select: "name lastname secondlastname",
    })
    .populate({
      path: "musicoId",
      select: "name",
    })
    .exec();
};
const eventPayment = async (id) => {
  const event = Event.find({ clienteId: id }).exec();
  return event;
};

const getEventByClient = async (id) => {
  const events = [];
  const event = await Event.find({})
    .populate({
      path: "clienteId",
      match: { _id: id },
      select: "name lastname secondlastname",
    })
    .populate({
      path: "musicoId",
      select: "nombreArtistico",
    })
    .exec();
  //const event2 = await Event.find({ clienteId: id }).exec();
  event.map((event) => {
    if (event.clienteId != "" && event.clienteId[0].id == id) {
      const objEvent = {
        titulo: event.titulo,
        aceptado: event.aceptado,
        fechaInicio: event.fechaInicio,
        fechaFinalizacion: event.fechaFinalizacion,
        cancelado: event.cancelado,
        nombreArtistico: event.musicoId[0].nombreArtistico,
      };
      events.push(objEvent);
    }
  });
  return events;
};

const getEventByMusician = async (id) => {
  const events = [];

  const event = await Event.find({})
    .populate({
      path: "musicoId",
      match: { _id: id },
      select: "name",
    })
    .populate({
      path: "clienteId",
      select: "name lastname secondlastname",
    })
    .exec();

  event.map((event) => {
    if (event.musicoId != "" && event.musicoId[0].id == id) {
      const objEvent = {
        _id: event._id,
        titulo: event.titulo,
        localizacion: event.localizacion,
        descripcion: event.descripcion,
        fechaInicio: event.fechaInicio,
        horaInicio: event.horaInicio,
        fechaFinalizacion: event.fechaFinalizacion,
        horaFinalizacion: event.horaFinalizacion,
        pago: event.pago,
        nameClient: event.clienteId[0].name,
      };
      events.push(objEvent);
    }
  });
  // console.log(events);
  return events;
};

const getAllEventByClient = async (id) => {
  return await Event.findById(id).populate("clientes").exec();
};

const update = async (id, eventData) => {
  const updatedEvent = await Event.findByIdAndUpdate(id, {
    ...eventData,
  }).exec();
  return updatedEvent;
};

const del = async (id) => {
  return await Event.findByIdAndDelete(id).exec();
};

const patch = async (id, event) => {
  console.log(id);
  return await Event.findByIdAndUpdate(id, { ...event }).exec();
};

module.exports = {
  create,
  getAll,
  update,
  del,
  patch,
  getAllEventByClient,
  getEventByClient,
  getEventByMusician,
  eventPayment,
};
