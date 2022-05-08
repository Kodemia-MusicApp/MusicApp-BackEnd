const groupRouter = require('./groups');

const apiRouter = (app) => {
    app.use('/groups', groupRouter);
}

module.exports = apiRouter;