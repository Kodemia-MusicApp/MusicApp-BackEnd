const State = require("../../models/state").model;

const create = async (name) => {
  const state = new State({ name });
  return await state.save();
};

const getAll = async () => {
  return await State.find({}).exec();
};

module.exports = {
  create,
  getAll,
};
