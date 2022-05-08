const authRoute = require("./auth");
const clientsRoute = require("./clients");
const groupsRoute = require("./groups");
const musiciansRoute = require("./musicians");

const apiRouter = (app) => {
  //app.use("/auth", authRoute);
  //app.use("/clients", clientsRoute);
  //app.use("/groups", groupsRoute);
  app.use("/musician", musiciansRoute);
};

module.exports = apiRouter;
