const router = require("express").Router();
const musician = require("../useCases/musician");
const jwt = require("../lib/jwt");
const { authHandler } = require("../middlewares/authHandler");
const { getById } = require("../useCases/client");

router.post("/", async (req, res, next) => {
  try {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      contrasenia,
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
    } = req.body;
    const creaMusician = await musician.creaMusico(
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      contrasenia,
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
    );
    const userId = await musician.getByEmail(correo);
    const token = await jwt.sign({
      _id: userId._id,
      type: userId.tipoMusico,
    });
    res.json({
      success: true,
      payload: [
        {
          token: token,
          name: userId.name,
          type: userId.tipoMusico,
          imagenusuario: userId.imagenMusico,
          lastname: userId.lastname,
          secondlastname: userId.lastname,
          state: userId.estado,
        },
      ],
    });
  } catch (error) {
    res.json({
      succes: false,
    });
  }
});

router.get("/id/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getById = await musician.getById(id);
    res.json({
      message: "Success",
      payload: [
        {
          id: getById._id,
          apellidoPaterno: getById.apellidoPaterno,
          apellidoMaterno: getById.apellidoMaterno,
          telefono: getById.numeroTelefono,
          imagenMusico: getById.imagenMusico,
          descripcion: getById.descripcion,
          genero: getById.genero,
          tipoMusico: getById.tipoMusico,
          cobroPorHora: getById.cobroPorHora,
          nombreArtistico: getById.nombreArtistico,
          horarioDiaUno: getById.horarioDiaUno,
          horarioDiaDos: getById.horarioDiaDos,
          horarioInicio: getById.horarioInicio,
          horarioFin: getById.horarioFin,
          estado: getById.estado,
        },
      ],
    });
  } catch (error) {
    res.json({
      succes: false,
    });
  }
});

router.get("/", authHandler, async (req, res, next) => {
  try {
    const { _id } = req.params.tokenPayload;
    const getById = await musician.getById(_id);

    res.json({
      message: "Success",
      payload: [
        {
          id: getById._id,
          name: getById.name,
          lastname: getById.lastname,
          secondlastname: getById.secondlastname,
          telefono: getById.numeroTelefono,
          imagenMusico: getById.imagenMusico,
          descripcion: getById.descripcion,
          genero: getById.genero,
          tipoMusico: getById.tipoMusico,
          cobroPorHora: getById.cobroPorHora,
          nombreArtistico: getById.nombreArtistico,
          horarioDiaUno: getById.horarioDiaUno,
          horarioDiaDos: getById.horarioDiaDos,
          horarioInicio: getById.horarioInicio,
          horarioFin: getById.horarioFin,
          state: getById.estado,
        },
      ],
    });
  } catch (error) {
    res.json({
      message: false,
    });
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const getAllMusician = await musician.getAll();
    let musicians = [];
    getAllMusician.forEach((musician, index) => {
      musicians[index] = {
        id: musician._id,
        apellidoPaterno: musician.apellidoPaterno,
        apellidoMaterno: musician.apellidoMaterno,
        telefono: musician.numeroTelefono,
        imagenMusico: musician.imagenMusico,
        descripcion: musician.descripcion,
        genero: musician.genero,
        tipoMusico: musician.tipoMusico,
        nombreArtistico: musician.nombreArtistico,
        horarioDiaUno: musician.horarioDiaUno,
        horarioDiaDos: musician.horarioDiaDos,
        horarioInicio: musician.horarioInicio,
        horarioFin: musician.horarioFin,
        cobroPorHora: musician.cobroPorHora,
        estado: musician.estado,
      };
    });
    res.json({
      message: true,
      payload: musicians,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
});

router.patch("/", authHandler, async (req, res, next) => {
  try {
    const { _id } = req.params.tokenPayload;
    const updateMusician = await musician.patch(_id, { ...req.body });
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      succes: false,
    });
  }
});

router.delete("/:correo", authHandler, async (req, res, next) => {
  try {
    const { correo } = req.params;
    const delMusician = await musician.del(correo);
    res.json({
      succes: true,
    });
  } catch (error) {}
});

module.exports = router;
