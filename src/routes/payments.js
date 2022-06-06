const router = require("express").Router();
const { json } = require("express/lib/response");
const request = require("request");
const api = require("../lib/config");

const auth = { user: api.api.user, pass: api.api.secret };

const createPayment = (req, res) => {
  const { price } = req.body;
  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "MXN", //https://developer.paypal.com/docs/api/reference/currency-codes/
          value: `${price}`,
        },
      },
    ],
    application_context: {
      brand_name: `tumusicoahora`,
      landing_page: "NO_PREFERENCE", // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
      user_action: "PAY_NOW", // Accion para que en paypal muestre el monto del pago
      return_url: `http://localhost:8080/payment/execute-payment`, // Url despues de realizar el pago
      cancel_url: `http://localhost:8080/payment/cancel-payment`, // Url despues de realizar el pago
    },
  };
  request.post(
    `${api.api.paypal}/v2/checkout/orders`,
    {
      auth,
      body,
      json: true,
    },
    (err, response) => {
      res.json({ data: response.body });
    }
  );
};

const executePayment = (req, res) => {
  const token = req.query.token; //<-----------
  console.log("Entra dos");
  request.post(
    `${api.api.paypal}/v2/checkout/orders/${token}/capture`,
    {
      auth,
      body: {},
      json: true,
    },
    (err, response) => {
      res.json({ data: response.body });
    }
  );
};

router.get(`/execute-payment`, executePayment);
router.post("/create-payments", createPayment);

module.exports = router;
