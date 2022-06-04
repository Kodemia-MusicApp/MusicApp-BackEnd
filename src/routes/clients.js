const express = require("express");
const cliente = require("../useCases/client");

//const { authHandler } = require("../middlewares/authHandlers");


const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
      
      const clientes = await cliente.getAll();
      res.json({
        success: true,
        payload: clientes,
      });
    } catch (error) {
      next(error);
    }
  });


router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const retrievedCLient = await cliente.getById(id);
    res.json({
      success: true,
      payload: retrievedCLient,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name,lastname,secondlastname,password,email,phone,paymentmethod,estado } = req.body;

    const clientCreated = await cliente.create(name,lastname,secondlastname,password,email,phone,paymentmethod,estado);

    res.json({
      success: true,
      message: "Cliente created",
      payload: clientCreated,
    });
  } catch (error) {
    next(error);
  }
});


router.put("/:id", async(req, res,next) => {
  try {
      console.log(req)
    const { id } = req.params;
    const clienteUpdate  = await cliente.update(id,req.body)
    
    res.json({     
      success: true,
      message: "Cliente actualizado",
      payload: clienteUpdate });
  }catch (error) {
    next(error);
  }
});



module.exports = router;
