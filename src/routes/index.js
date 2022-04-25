const authMiddlewares = require("../app/middlewares/AuthMiddlewares");
const siteRouter = require("./site");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const doctorRouter = require("./doctor");
const callVideoRouter = require("./callVideo");
const inboxRouter = require("./inbox");
const paymentRouter = require("./payment");
const userRouter = require("./user");
const accountRouter = require("./account");
const bookingRouter = require("./booking");
function router(app) {
  app.use(
    "/admin",
    authMiddlewares.checkAccount,
    authMiddlewares.checkRoleAdmin,
    authMiddlewares.addInfoAuthencation,
    adminRouter
  );
  app.use(
    "/account",
    authMiddlewares.checkAccount,
    authMiddlewares.checkRoleAdmin,
    accountRouter
  );
  app.use(
    "/doctor",
    authMiddlewares.checkAccount,
    authMiddlewares.checkRoleDoctor,
    authMiddlewares.addInfoAuthencation,
    doctorRouter
  );
  app.use(
    "/payment",
    authMiddlewares.checkAccount,
    authMiddlewares.checkRoleUser,
    paymentRouter
  );
  app.use(
    "/callVideo",
    authMiddlewares.checkAccount,
    authMiddlewares.addInfoAuthencation,
    callVideoRouter
  );
  app.use(
    "/inbox",
    authMiddlewares.checkAccount,
    authMiddlewares.addInfoAuthencation,
    inboxRouter
  );
  app.use("/auth", authRouter);
  app.use(
    "/user",
    authMiddlewares.checkAccount,
    authMiddlewares.addInfoAuthencation,
    userRouter
  );
  app.use(
    "/booking",
    authMiddlewares.checkAccount,
    authMiddlewares.addInfoAuthencation,
    bookingRouter
  );
  app.use("/", authMiddlewares.addInfoAuthencation, siteRouter);
}
module.exports = router;
