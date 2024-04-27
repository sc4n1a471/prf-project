import { Router, Request, Response, NextFunction } from 'express';
import * as user from '../controllers/user.controller';
import * as auth from '../controllers/auth.controller';
import * as service from '../controllers/service.controller';
import * as dp from '../controllers/dp.controller';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.status(418).send('Pong!');
});

router.post('/login', auth.controller.login);
router.get('/checkAuth', auth.controller.checkAuth);
router.post('/logout', auth.controller.logout);

router.get('/users', user.controller.getUsers);
router.get('/users/:id', user.controller.getUser);
router.post('/users', user.controller.createUser);
router.delete('/users/:id', user.controller.deleteUser);
router.delete('/users/permanently/:id', user.controller.deleteUserPermanently);

router.get('/services', service.controller.getServices);
router.get('/services/:id', service.controller.getService);
router.post('/services', service.controller.createService);
router.patch('/services/:id', service.controller.updateService);
router.delete('/services/:id', service.controller.deleteService);

// For testing purposes
router.post('/users/create-admin', user.controller.createAdmin);
router.get('/dp', dp.controller.getDynamicPrices);

export default router;