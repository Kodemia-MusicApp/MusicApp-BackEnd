const musiciansRoute = require("./musicians");
const authRouter = require("./auth");
const payments = require("./payments");
const clients = require("./clients");
const event = require("./event");

const apiRouter = (app) => {
  app.use("/auth", authRouter);
  app.use("/musician", musiciansRoute);
  app.use("/payment", payments);
  app.use("/clients", clients);
  app.use("/event", event);
};

module.exports = apiRouter;
