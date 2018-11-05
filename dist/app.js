"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var expressLayouts = require("express-ejs-layouts");
var routes_1 = require("./routes");
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.config();
        routes_1.default(this.app);
        this.mongoSetup();
    }
    App.prototype.config = function () {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(methodOverride('_method'));
        this.app.use(cookieParser);
        // this.app.use(passport.initialize());
        this.app.use(expressSession({
            secret: 'xxxxxxxx',
            resave: true,
            saveUninitialized: true,
            cookie: { secure: true }
        }));
        // this.app.use(passport.session());
        // this.app.use(connectFlash());
        this.app.use(expressLayouts);
        this.app.set('view engine', 'ejs');
        this.app.set('views', './lib/views');
        this.app.set('layout extractScripts', true);
        this.app.set('layout extractStyles', true);
    };
    App.prototype.mongoSetup = function () {
        mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
    };
    return App;
}());
exports.default = new App().app;
//# sourceMappingURL=app.js.map