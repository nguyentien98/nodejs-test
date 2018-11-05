"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
function mongooseId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}
exports.default = mongooseId;
//# sourceMappingURL=mongooseId.js.map