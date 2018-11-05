"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PostController_1 = require("../controllers/PostController");
var controller = new PostController_1.default;
function postRoutes(app) {
    app.route('/posts')
        .get(controller.getPosts)
        .post(controller.saveBook);
}
exports.default = postRoutes;
//# sourceMappingURL=PostRoutes.js.map