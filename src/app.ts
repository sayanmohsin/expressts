// imports
import './configs/initEnv';
import express, {
    Application,
    Request,
    Response,
    NextFunction
} from 'express';
import createError from 'http-errors'
import path from 'path'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import compression from 'compression';
import chalk from 'chalk';
import pino from 'pino';
import expressPino from 'express-pino-logger';
import { spawn } from 'child_process';
import stream from 'stream';

// Environment variables
const cwd = process.cwd();
const { env } = process;

// custom
import { normalizePort } from './utils/server.util';

// interfaces
import { statusResponse } from './interfaces/results.interface';

(async () => {
    let logger = pino({
        name: 'ExpressTS',
        prettyPrint: {
            colorize: true,
            levelFirst: false,
            timestampKey: 'time',
            translateTime: false,
        },
    });

    const app: Application = express();

    // routes
    let { secureRouter } = await import('./routes/secure');

    let port: string = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    // middlewares
    app.options('*', cors());
    app.use(cors());
    app.use(expressPino({
        logger: logger
    }));
    app.use(helmet());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));

    app.all('/health', (req: Request, res: Response, next: NextFunction) => {
        try {
            let status: statusResponse = {
                done: false,
                message: '',
                code: 200
            };
            status.done = true;
            res.send(status);
        } catch (err) {
            next(err);
        }
    });

    app.use('/v1/secure', await secureRouter())

    // auth error
    app.get('/forbidden', (req, res, next) => {
        next(createError(403))
    });

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(createError(404))
    });

    app.listen(port, (): void => {
        console.log(`Express server started on port http://localhost:${port}`);
    });
})();


