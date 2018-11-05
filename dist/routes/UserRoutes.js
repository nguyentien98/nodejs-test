"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("../controllers/UserController");
var controller = new UserController_1.UserController();
function userRoutes(app) {
    app.route('/users')
        .get(controller.getAll)
        .post(controller.addNewUser);
    app.route('/users/add')
        .get(controller.addUserView);
    app.route('/users/:id')
        .get(controller.findOne)
        .put(controller.updateUser)
        .delete(controller.deleteUser);
}
exports.default = userRoutes;
//# sourceMappingURL=UserRoutes.js.map