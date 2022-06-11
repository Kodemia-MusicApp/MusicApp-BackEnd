const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  id_evento: [
    {
      type: Schema.Types.ObjectId,
      ref: "envents",
    },
  ],
  quienpago: { type: String, required: false },
  fechapago: { type: String, required: false },
  idpago: { type: String, required: false },
  artistacontratado: { type: String, required: false },
  full_name: { type: String, required: false },
  address_line_1: { type: String, required: false },
  address_line_2: { type: String, required: false },
  admin_area_2: { type: String, required: false },
  admin_area_1: { type: String, required: false },
  postal_code: { type: String, required: false },
  country_code: { type: String, required: false },
  paymentsId: { type: String, required: false },
  paymentsStatus: { type: String, required: false },
  payments_seller_receivable_breakdown_gross_amount: {
    type: String,
    required: false,
  },
  payments_seller_receivable_breakdown_paypal_fee: {
    type: String,
    required: false,
  },
  payments_seller_receivable_breakdown_net_amount: {
    type: String,
    required: false,
  },
  payments_seller_receivable_breakdown_create_time: {
    type: String,
    required: false,
  },
  payments_seller_receivable_breakdown_update_time: {
    type: String,
    required: false,
  },
  payments_payer_name: { type: String, required: false },
  payments_payer_email_address: { type: String, required: false },
  payments_payer_id: { type: String, required: false },
});

module.exports = {
  schema,
  model: mongoose.model("Pago", schema),
};
