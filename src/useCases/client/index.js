//cambiar user por client
const Cliente = require("../../models/cliente").model;
const encrypt = require("../../lib/encrypt");

const getAll = async () => {
  return await Cliente.find({}).exec();
};

const getById = async (id) => {
  return await Cliente.findById(id).exec();
};

const create = async (
  name,
  lastname,
  secondlastname,
  password,
  email,
  phone,
  paymentmethod,
  estado,
  municipio
) => {
  const hash = await encrypt.hashPasword(password);
  const cliente = new Cliente({
    name,
    lastname,
    secondlastname,
    password: hash,
    email,
    phone,
    paymentmethod,
    estado,
    municipio,
  });
  return await cliente.save();
};

const update = async (id, data) => {
  const userfound = await Cliente.findByIdAndUpdate(id, data);
  return userfound;
};

const del = async (id) => {
  return await Cliente.findByIdAndDelete(id);
};

const getByEmail = async (email) => {
  return await Cliente.findOne({ email }).exec();
};

const authenticate = async (cliente, password) => {
  const hash = cliente.password;
  return await encrypt.verifyPassword(password, hash);
};
module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  getByEmail,
  authenticate,
};
