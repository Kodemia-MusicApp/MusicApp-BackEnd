const musiciansRoute = require("./musicians");
const groupRouter = require("./groups");
const genderRouter = require("./genders");
const authRouter = require("./auth");

const apiRouter = (app) => {
  app.use("/groups", groupRouter);
  app.use("/genders", genderRouter);
  app.use("/auth", authRouter);
  app.use("/musician", musiciansRoute);
};

module.exports = apiRouter;
