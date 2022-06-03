const Musicians = require("../../models/musician").model;
const encrypt = require("../../lib/encrypt");

const creaMusico = async (
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  correo,
  contrasenia,
  descripcion,
  tipoMusico
) => {
  const hash = await encrypt.hashPasword(contrasenia);
  const creaMusician = new Musicians({
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    correo,
    contrasenia: hash,
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

const del = async (correo) => {
  return await Musicians.findOneAndDelete(correo).exec();
};

const authenticate = async (user, contrasenia) => {
  const hash = user.contrasenia;
  return await encrypt.verifyPassword(contrasenia, hash);
};

module.exports = {
  creaMusico,
  patch,
  getByEmail,
  del,
  authenticate,
};
