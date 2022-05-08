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

module.exports = {
  creaMusico,
};
