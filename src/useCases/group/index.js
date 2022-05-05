const Group = require('../../models/group').model;
const encrypt = require('../../lib/encrypt');

const create = async (nombre, representante, correo, telefono, password, integrantes, precioHora, zonaServicio, descripcion, genero) => {
    const hash = await encrypt.hash(password);
    const group = new Group({
        nombre,
        representante,
        correo,
        telefono,
        password: hash,
        integrantes,
        precioHora,
        zonaServicio,
        descripcion,
        genero,
    });
    return await group.save();
};

const getAll = async () => {
    return await Group.find({}).exec();
};

const getByName = async (nombre) => {
    return await Group.findOne({ nombre }).exec();
};
