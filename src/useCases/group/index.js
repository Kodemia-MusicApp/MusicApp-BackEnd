const Group = require('../../models/group').model;
const encrypt = require('../../lib/encrypt');

const create = async (nombre, representante, correo, telefono, password, integrantes, precioHora, zonaServicio, descripcion, genero) => {
    const hash = await encrypt.hashPasword(password);
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
    return await Group.findOne({ nombre: nombre }).exec();
};

const getByEmail = async (email) => {
    return await Group.findOne({ correo: email }).exec();
};

const update = async (id, userData) => {
    const { nombre, representante, correo, telefono, integrantes, precioHora, zonaServicio, descripcion, genero } = userData
    const updatedGroup = await Group.findByIdAndUpdate(id, { 
        nombre,
        representante,
        correo,
        telefono,
        integrantes,
        precioHora,
        zonaServicio,
        descripcion,
        genero
        },
        { new: true },
    ).exec();
    return updatedGroup;
};

const del = async (id) => {
    return await Group.findByIdAndDelete(id).exec();
};

const autenticate = async (group, password) => {
    const hash = group.password;
    return await encrypt.verifyPassword(password, hash);
};

module.exports = {
    create,
    getAll,
    getByName,
    getByEmail,
    update,
    del,
    autenticate,
};