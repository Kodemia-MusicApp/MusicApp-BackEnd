const Gender = require('../../models/gender').model;

const create = async (nombre) => {
    const gender = new Gender({
        nombre
    });
    return await gender.save();
}

const getAll = async () => {
    return await Gender.findOne({}).exec();
};

const getByName = async (nombre) => {
    return await Gender.findOne({nombre: nombre}).exec();
};

const update = async (id, nombre) => {
    const updatedGender = await Gender.findByIdAndUpdate(id,
        { nombre },
        { new: true }
    ).exec();
    return updatedGender
};

const del = async (id) => {
    return await Gender.findByIdAndDelete(id).exec();
};

module.exports = {
    create,
    getAll,
    getByName,
    update,
    del
};