const groupRouter = require('./groups');
const genderRouter = require('./genders');

const apiRouter = (app) => {
    app.use('/groups', groupRouter);
    app.use('/genders', genderRouter);
}

module.exports = apiRouter;