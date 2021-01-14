const { authJwt, oneMap } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/all", controller.allAccess);

  app.get(
    "/api/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/driver",
    [authJwt.verifyToken, authJwt.isDriver],
    controller.driverBoard
  );

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.delete(
    "/api/del/:id",
    controller.deleteUser
  );

  app.get(
    "/api/search", 
    // [authJwt.verifyToken],
    oneMap.oneMapSearch
  );
  
};