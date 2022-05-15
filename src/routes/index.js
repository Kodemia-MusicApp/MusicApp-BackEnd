const groupRouter = require('./groups');
const genderRouter = require('./genders');
const authRouter = require('./auth');
const reviewRouter = require('./review');
const eventRouter = require('./event');

const apiRouter = (app) => {
    app.use('/groups', groupRouter);
    app.use('/genders', genderRouter);
    app.use('/auth', authRouter);
    app.use('/reviews', reviewRouter);
    app.use('/events', eventRouter);
}

module.exports = apiRouter;