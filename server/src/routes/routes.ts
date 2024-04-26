import { Router, Request, Response, NextFunction } from 'express';
import * as user from '../controllers/user.controller';
import * as auth from '../controllers/auth.controller';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.status(418).send('Pong!');
});

router.post('/login', auth.controller.login);
router.get('/checkAuth', auth.controller.checkAuth);
router.post('/logout', auth.controller.logout);

router.get('/users', user.controller.getUsers);
router.post('/users', user.controller.createUser);
router.post('/users/create-admin', user.controller.createAdmin);

export default router;