const express = require("express");
const pago = require("../useCases/pagos");

//const { authHandler } = require("../middlewares/authHandlers");


const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
      
      const pagos = await pago.getAll();
      res.json({
        success: true,
        payload: pagos,
      });
    } catch (error) {
      next(error);
    }
  });


router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const retrievedpago = await pago.getById(id);
    res.json({
      success: true,
      payload: retrievedpago,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { quienpago, fechapago,idpago, artistacontratado} = req.body;

    const pagoCreated = await pago.create(quienpago, fechapago,idpago, artistacontratado);

    res.json({
      success: true,
      message: "Cliente created",
      payload: pagoCreated,
    });
  } catch (error) {
    next(error);
  }
});


router.put("/:id", async(req, res,next) => {
  try {
      console.log(req)
    const { id } = req.params;
    const pagoUpdate  = await pago.update(id,req.body)
    
    res.json({     
      success: true,
      message: "Pago actualizado",
      payload: pagoUpdate });
  }catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const delPago = await pago.del(id);
    res.json({
      succes: true,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
