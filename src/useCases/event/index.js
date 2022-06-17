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
  const event = await Event.find({ clienteId: id })
    .find({ status: "aceptado" })
    .populate({
      path: "musicoId",
      select: "nombreArtistico imagenMusico",
    })
    .exec();

  return event;
};

const eventProgress = async (id) => {
  const event = await Event.find({ clienteId: id })
    .find({ status: "pagado" })
    .populate({
      path: "musicoId",
      select: "nombreArtistico imagenMusico",
    })
    .exec();

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
      select: "nombreArtistico imagenMusico",
    })
    .exec();
  //const event2 = await Event.find({ clienteId: id }).exec();
  event.map((event) => {
    if (
      event.clienteId != "" &&
      event.clienteId[0].id == id &&
      event.aceptado === true &&
      event.pagoAceptado === false &&
      event.cancelado === false
    ) {
      const objEvent = {
        titulo: event.titulo,
        aceptado: event.aceptado,
        fechaInicio: event.fechaInicio,
        fechaFinalizacion: event.fechaFinalizacion,
        cancelado: event.cancelado,
        nombreArtistico: event.musicoId[0].nombreArtistico,
        imagenMusico: event.musicoId[0].imagenMusico,
        pagoAceptado: event.pagoAceptado,
        colonia: event.colonia,
        calle: event.calle,
        numero: event.numero,
        ciudad: event.ciudad,
        _id: event._id,
        eventoTerminado: event.eventoTerminado,
        cancelado: event.cancelado,
        pago: event.pago,
        descripcion: event.descripcion,
      };
      events.push(objEvent);
    }
  });
  const event2 = await Event.find({ clienteId: id })
    .populate({
      path: "musicoId",
      select: "name phone estado",
    })
    .exec();
  console.log(event2);
  return event2;
};

const getEventByMusician = async (id) => {
  const event2 = await Event.find({ musicoId: id })
    .populate({
      path: "clienteId",
      select: "name phone estado",
    })
    .exec();

  return event2;
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
  return await Event.findByIdAndUpdate(id, { ...event }).exec();
};
//event.eventoTerminado != true &&
const checkEventAccept = async (id) => {
  const findEvent = await Event.find({ clienteId: id })
    .find({ status: "aceptado" })
    .exec();
  let acceptedEvent;
  if (findEvent.length > 0) acceptedEvent = true;
  else acceptedEvent = false;

  return acceptedEvent;
};

const checkNewEvents = async (id) => {
  const findEvent = await Event.find({ musicoId: id })
    .find({ status: "Create" })

    .exec();
  let acceptedEvent;
  if (findEvent.length > 0) acceptedEvent = true;
  else acceptedEvent = false;

  return acceptedEvent;
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
  checkEventAccept,
  checkNewEvents,
  eventProgress,
};
