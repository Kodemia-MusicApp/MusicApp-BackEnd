const bcrypt = require('bcrypt');

const hashPasword = async (password) => {
    return await bcrypt.hash(password, 18);
};

const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = { hashPasword, verifyPassword };