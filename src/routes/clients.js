const router = require("express").Router();
const clients = require("../useCases/client");
const jwt = require("../lib/jwt");

router.post("/", async (req, res, next) => {
  try {
    const {
      names,
      lastname,
      secondlastname,
      imagenusuario,
      password,
      email,
      phone,
      paymentmethod,
      estado,
    } = req.body;
    const createClient = await clients.create(
      names,
      lastname,
      secondlastname,
      imagenusuario,
      password,
      email,
      phone,
      paymentmethod,
      estado
    );
    const newClient = await clients.getByEmail(email);
    const token = await jwt.sign({
      _id: newClient._id,
    });
    newClient
      .then((req) => req.json())
      .then((body) => {
        console.log(body);
      });
    res.json({
      success: true,
      payload: token,
      id: newClient._id,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
});

module.exports = router;
