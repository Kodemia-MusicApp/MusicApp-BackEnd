const Event = require('../../models/event').model;

const create = async (titulo, localizacion, descripcion, fechaInicio, horaInicio, fechaFinalizacion, horaFinalizacion, contratista, contratado, pago) => {
    const event = new Event({
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
    return await event.save();
};

const getAll = async () => {
    return await Event.find({}).exec();
};

const update = async (id, eventData) => {
    const { titulo, localizacion, descripcion, fechaInicio, horaInicio, fechaFinalizacion, horaFinalizacion, contratista, contratado, pago } = eventData
    const updatedEvent = await Event.findByIdAndUpdate(id, { 
        titulo,
        localizacion,
        descripcion,
        fechaInicio,
        horaInicio,
        fechaFinalizacion,
        horaFinalizacion,
        contratista,
        contratado,
        pago
        },
        { new: true },
    ).exec();
    return updatedEvent;
}

const del = async (id) => {
    return await Event.findByIdAndDelete(id).exec();
};

module.exports = {
    create,
    getAll,
    update,
    del,
}