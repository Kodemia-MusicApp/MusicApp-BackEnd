const groupRouter = require('./groups');
const genderRouter = require('./genders');
const authRouter = require('./auth');
const reviewRouter = require('./review');

const apiRouter = (app) => {
    app.use('/groups', groupRouter);
    app.use('/genders', genderRouter);
    app.use('/auth', authRouter);
    app.use('/reviews', reviewRouter);
}

module.exports = apiRouter;