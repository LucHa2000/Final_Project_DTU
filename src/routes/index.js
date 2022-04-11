const siteRouter = require("./site");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const doctorRouter = require("./doctor");
const callVideoRouter = require("./callVideo");
const inboxRouter = require("./inbox");
const authMiddlewares = require("../app/middlewares/AuthMiddlewares");

function router(app) {
  app.use(
    "/admin",
    authMiddlewares.checkAccount,
    authMiddlewares.checkRoleAdmin,
    adminRouter
  );
  app.use(
    "/doctor",
    authMiddlewares.checkAccount,
    authMiddlewares.checkRoleDoctor,
    doctorRouter
  );
  app.use("/callVideo", callVideoRouter);
  app.use("/inbox", inboxRouter);
  app.use("/auth", authRouter);
  app.use("/", siteRouter);
}
module.exports = router;
