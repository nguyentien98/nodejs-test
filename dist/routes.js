"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRoutes_1 = require("./routes/UserRoutes");
var PostRoutes_1 = require("./routes/PostRoutes");
function routes(app) {
    UserRoutes_1.default(app);
    PostRoutes_1.default(app);
}
exports.default = routes;
//# sourceMappingURL=routes.js.map