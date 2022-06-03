const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
    id_group: { type: String, required: true },
    review: { type: String, required: true, minlenght: 10, maxlenght: 120 },
    id_client: { type: String, required: true },
});

module.exports = {
    schema,
    model: mongoose.model('Review', schema),
}