const musiciansRoute = require("./musicians");
const groupRouter = require("./groups");
const genderRouter = require("./genders");
const authRouter = require("./auth");
const stateRouter = require("./state");
const payments = require("./payments");

const apiRouter = (app) => {
  app.use("/groups", groupRouter);
  app.use("/genders", genderRouter);
  app.use("/auth", authRouter);
  app.use("/musician", musiciansRoute);
  app.use("/payment", payments);
};

module.exports = apiRouter;
