import * as express from 'express';
import userRoutes from "./routes/UserRoutes";
import postRoutes from "./routes/PostRoutes";
import authenticationRoutes from "./routes/AuthenticationRoutes";

export default function routes(app: express.Application) {
    userRoutes(app);
    postRoutes(app);
    authenticationRoutes(app);
}