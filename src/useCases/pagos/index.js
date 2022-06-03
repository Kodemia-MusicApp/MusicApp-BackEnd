//cambiar  client x pago 
const Pago = require ("../../models/pagos").model;
const encrypt = require("../../lib/encrypt")

const getAll = async () => {
    return await Pago.find({}).exec();
  };
  
  const getById = async (id) => {
    return await Pago.findById(id).exec();
  };
  

  const create = async ( quienpago, fechapago,idpago, artistacontratado ) => {
    //const hash = await encrypt.hashPassword(password)
    const pago  = new Pago({ quienpago, fechapago,idpago, artistacontratado});
    return await pago.save();
  };
  
  const update = async (id,data) => {
  const userfound =  await Pago.findByIdAndUpdate(id,data)
  return userfound
  };
  
  const del = async (id) => {
    return await Pago.findByIdAndDelete(id);
  };

  //const del = async (id) => {
  //  return await Pago.findOneAndDelete(id).exec();
  //};


module.exports = { getAll, getById, create, update, del}