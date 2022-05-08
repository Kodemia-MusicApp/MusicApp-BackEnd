const Musicians = require("../../models/musician").model;

const creaMusico = async (
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  correo,
  contrasenia,
  descripcion,
  tipoMusico
) => {
  const creaMusician = new Musicians({
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    correo,
    contrasenia,
    descripcion,
    tipoMusico,
  });
  return await creaMusician.save();
};

const getByEmail = async (correo) => {
  const findMusician = await Musicians.findOne({ correo }).exec();
  return findMusician;
};

const patch = async (correo, musicianData) => {
  return await Musicians.findOneAndUpdate(correo, { ...musicianData })
    .exec()
    .catch((error) => console.log(error));
};

const del = async (id) => {
  return await Musicians.findByIdAndDelete(id).exec();
};

module.exports = {
  creaMusico,
  patch,
  getByEmail,
  del,
};
