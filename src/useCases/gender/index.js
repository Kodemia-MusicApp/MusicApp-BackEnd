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