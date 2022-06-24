const router = require("express").Router();
const request = require("request");
const api = require("../lib/config");
const payment = require("../useCases/pagos");
const event = require("../useCases/event");

const auth = { user: api.api.user, pass: api.api.secret };
const createPayment = (req, res) => {
  const { price, custom_id } = req.body;
  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: `${custom_id}`,
        amount: {
          currency_code: "MXN",
          value: `${price}`,
        },
      },
    ],
    application_context: {
      brand_name: `tumusicoahora`,
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `${process.env.URL_API_BACK_END}/payment/execute-payment`,
      cancel_url: `${process.env.URL_API_BACK_END}/payment/cancel-payment`,
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
  const token = req.query.token;
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
        res.redirect(`${process.env.URL_FRONT_END}/reservationaccepted`);
        const eventPayment = event.update(
          response.body.purchase_units[0].reference_id,
          { status: "pagado" }
        );
      } catch (error) {
        res.json({ success: false });
      }
    }
  );
};
router.get(`/execute-payment`, executePayment);
router.get(`/cancel-payment`, async (req, res, next) => {
  res.redirect(`${process.env.URL_FRONT_END}/payment/refused`);
});
router.post("/create-payments", createPayment);
module.exports = router;
