//cambiar  client x pago
const Pago = require("../../models/pagos").model;
const encrypt = require("../../lib/encrypt");

const getAll = async () => {
  return await Pago.find({}).exec();
};

const getById = async (id) => {
  return await Pago.findById(id).exec();
};

const create = async (payment) => {
  const pago = new Pago({
    id_evento: payment.purchase_units[0].reference_id,
    quienpago: payment.purchase_units[0].shipping.name.full_name,
    fechapago: payment.purchase_units[0].payments.captures[0].create_time,
    idpago: payment.id,
    artistacontratado: "",
    full_name: payment.purchase_units[0].shipping.name.full_name,
    address_line_1: payment.purchase_units[0].shipping.address.address_line_1,
    address_line_2: payment.purchase_units[0].shipping.address.address_line_2,
    admin_area_2: payment.purchase_units[0].shipping.address.admin_area_2,
    admin_area_1: payment.purchase_units[0].shipping.address.admin_area_1,
    postal_code: payment.purchase_units[0].shipping.address.postal_code,
    country_code: payment.purchase_units[0].shipping.address.country_code,
    paymentsId: payment.purchase_units[0].payments.captures[0].id,
    paymentsStatus: payment.purchase_units[0].payments.captures[0].status,
    payments_seller_receivable_breakdown_gross_amount:
      payment.purchase_units[0].payments.captures[0].seller_receivable_breakdown
        .gross_amount.value,
    payments_seller_receivable_breakdown_paypal_fee:
      payment.purchase_units[0].payments.captures[0].seller_receivable_breakdown
        .paypal_fee.value,
    payments_seller_receivable_breakdown_net_amount:
      payment.purchase_units[0].payments.captures[0].seller_receivable_breakdown
        .net_amount.value,
    payments_seller_receivable_breakdown_create_time:
      payment.purchase_units[0].payments.captures[0].create_time,
    payments_seller_receivable_breakdown_update_time:
      payment.purchase_units[0].payments.captures[0].update_time,
    payments_payer_name: `${payment.payer.name.given_name} ${payment.payer.name.surname}`,
    payments_payer_email_address: payment.payer.email_address,
    payments_payer_id: payment.payer.payer_id,
  });

  return await pago.save();
};

const update = async (id, data) => {
  const userfound = await Pago.findByIdAndUpdate(id, ...data);
  return userfound;
};

const del = async (id) => {
  return await Pago.findByIdAndDelete(id);
};

//const del = async (id) => {
//  return await Pago.findOneAndDelete(id).exec();
//};

module.exports = { getAll, getById, create, update, del };
