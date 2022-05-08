const Gender = require('../../models/gender').model;

const create = async (nombre) => {
    const gender = new Gender({
        nombre
    });
    return await gender.save();
}

