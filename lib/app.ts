import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as methodOverride from 'method-override';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import * as flash from 'express-flash';
import * as expressSession from 'express-session';
import * as expressLayouts from 'express-ejs-layouts';
import routes from './routes';
import { UserModel } from "./models/UserModel";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        routes(this.app);
        this.mongoSetup();
        this.passport();
    }

    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(methodOverride('_method'));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(expressLayouts);
        this.app.use(flash());
        this.app.use(cookieParser('keyboard cat'));
        this.app.use(expressSession({
            cookie: { maxAge: 60000 },
            resave: false,
            saveUninitialized: true
        }));
        this.app.set('view engine', 'ejs');
        this.app.set('views', './lib/views');
        this.app.set('layout extractScripts', true);
        this.app.set('layout extractStyles', true);
    }

    mongoSetup() {
        mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
    }

    passport() {
        passport.serializeUser(function(user, done) {
            done(null, user._id);
        });
        
        passport.deserializeUser(function(id, done) {
            UserModel.findById(id, function(err, user) {
            done(err, user);
          });
        });
        passport.use(new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password'
            },
            async function (username, password, done) {
                let user = await UserModel.findOne({ email : username });
                if (! user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (! user.checkPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            }
        ));
    }
}

export default new App().app;
