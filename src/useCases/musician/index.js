const Musicians = require("../../models/musician").model;
const encrypt = require("../../lib/encrypt");

const creaMusico = async (
  name,
  lastname,
  secondlastname,
  email,
  password,
  descripcion,
  genero,
  phone,
  tipoMusico,
  nombreArtistico,
  horarioDiaUno,
  horarioDiaDos,
  horarioInicio,
  horarioFin,
  cobroPorHora
) => {
  const hash = await encrypt.hashPasword(password);
  const creaMusician = new Musicians({
    name,
    lastname,
    secondlastname,
    email,
    password: hash,
    descripcion,
    genero,
    phone,
    tipoMusico,
    nombreArtistico,
    horarioDiaUno,
    horarioDiaDos,
    horarioInicio,
    horarioFin,
    cobroPorHora,
  });
  return await creaMusician.save();
};

const getAll = async () => {
  const allMusicians = await Musicians.find({}).exec();
  return allMusicians;
};

const getById = async (id) => {
  const findById = await Musicians.findById(id).exec();
  return findById;
};

const getByEmail = async (correo) => {
  const findMusician = await Musicians.findOne({ email: correo }).exec();
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
  const hash = user.password;
  return await encrypt.verifyPassword(contrasenia, hash);
};

module.exports = {
  creaMusico,
  patch,
  getByEmail,
  del,
  authenticate,
  getById,
  getAll,
};
