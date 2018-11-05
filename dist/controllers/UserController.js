"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel_1 = require("../models/UserModel");
var mongooseId_1 = require("../helpers/mongooseId");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAll = function (req, res) {
        try {
            UserModel_1.UserModel.find(function (error, users) {
                res.render('users/list', {
                    users: users
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    UserController.prototype.addUserView = function (req, res) {
        res.render('users/add');
    };
    UserController.prototype.addNewUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, savedUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new UserModel_1.UserModel(req.body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user.save()];
                    case 2:
                        savedUser = _a.sent();
                        res.redirect('users');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.redirect('back');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        try {
            var id_1 = req.params.id;
            if (!mongooseId_1.default(id_1)) {
                throw { message: 'User not found' };
            }
            UserModel_1.UserModel.findOne({ _id: id_1 }, function (error, user) {
                if (error)
                    throw error;
                if (user !== null) {
                    UserModel_1.UserModel.deleteOne({ _id: id_1 }, function (error, user) {
                        res.redirect('back');
                    });
                }
                else {
                    res.json({ message: 'User not found.' });
                }
            });
        }
        catch (error) {
            res.json(error);
        }
    };
    UserController.prototype.findOne = function (req, res) {
        try {
            var id = req.params.id;
            if (!mongooseId_1.default(id)) {
                throw { message: 'User not found' };
            }
            UserModel_1.UserModel.findOne({ _id: id })
                .populate('posts')
                .exec(function (error, user) {
                if (error)
                    res.json(error);
                if (user !== null) {
                    res.json(user);
                }
                else {
                    res.json({ message: 'User not found.' });
                }
            });
        }
        catch (error) {
            res.json(error);
        }
    };
    UserController.prototype.updateUser = function (req, res) {
        try {
            var id_2 = req.params.id;
            if (!mongooseId_1.default(id_2)) {
                throw { message: 'User not found' };
            }
            UserModel_1.UserModel.findOne({ _id: id_2 }, function (error, data) {
                if (error)
                    throw error;
                if (data !== null) {
                    UserModel_1.UserModel.updateOne({ _id: id_2 }, { $set: req.body }, function (error, data) {
                        if (error)
                            throw error;
                        res.json(data);
                    });
                }
                else {
                    res.json({ message: 'User not found' });
                }
            });
        }
        catch (error) {
            res.json(error);
        }
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map