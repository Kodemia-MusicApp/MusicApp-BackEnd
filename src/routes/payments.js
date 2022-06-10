const router = require("express").Router();
const { json } = require("express/lib/response");
const request = require("request");
const api = require("../lib/config");
const payment = require("../useCases/pagos");
//const config = require("../lib/config");

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
      return_url: `${process.env.URL_API_BACK_END}/execute-payment`, // Url despues de realizar el pago
      cancel_url: `${process.env.URL_API_BACK_END}/cancel-payment`, // Url despues de realizar el pago
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
  request.post(
    `${api.api.paypal}/v2/checkout/orders/${token}/capture`,
    {
      auth,
      body: {},
      json: true,
    },
    (err, response) => {
      try {
        const paymantCreate = payment.create(response.body);
        res.redirect(process.env.URL_FRONT_END);
        //console.log(process.env.URL_API_BACK_END);
        //res.json({ success: true });
      } catch (error) {
        res.json({ success: false });
      }
    }
  );
};

router.get(`/execute-payment`, executePayment);
router.get(`/cancel-payment`, async (req, res, next) => {
  res.json({
    success: false,
  });
});
router.post("/create-payments", createPayment);

module.exports = router;
