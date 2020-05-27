// imports
import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';

// services
import { createUser } from '../services/users.service';

// interfaces
import { statusResponse, dataResponse } from '../interfaces/results.interface';

export const secureRouter = async () => {
    let router = Router();

    // get users
    router.get('/users', (req: Request, res: Response, next: NextFunction) => {
        try {
            let result: dataResponse<object> = {
                done: false,
                message: '',
                code: 200,
                data: []
            };

            res.send(result);
        } catch (err) {
            next(err);
        }
    });

    // create user
    router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result: dataResponse<object> = {
                done: false,
                message: '',
                code: 200,
                data: {}
            };

            let newUser: object = await createUser(req.body);
            if (!newUser) {
                result.done = false;
            } else {
                result.done = true;
                result.data = newUser;
            }

            res.send(result);
        } catch (err) {
            next(err);
        }
    });

    return router;
}
