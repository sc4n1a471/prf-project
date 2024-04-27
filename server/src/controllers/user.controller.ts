import { Request, Response } from 'express';
import { User } from '../model/User';
import mongoose from 'mongoose';
import * as auth from './auth.controller';

async function getUsers(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = await auth.controller.checkAdmin(req, res);
        console.log(isAdmin);
         
        if (!isAdmin) {
            res.status(403).send('User is not an admin.');
            return;
        }
        
        const query = User.find({ownerId: req.user, isActive: true});
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    } else {
        res.status(401).send('User is not logged in.');
    }
}

async function getUser(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const query = User.findById(req.params.id);
        query.then(data => {
            if (data?.ownerId !== req.user || data?._id !== req.user) {
                res.status(403).send('User is not the owner of the requested user.');
                return;
            }
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    } else {
        res.status(401).send('User is not logged in.');
    }
}

async function createUser(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res);
        if (!isAdmin) {
            res.status(403).send('User is not an admin.');
            return;
        }

        const email = req.body.email
        const name = req.body.name
        const _id = new mongoose.Types.ObjectId()
        const ownerId = req.user
        const password = req.body.password

        const user = new User({email: email, name: name, _id: _id, ownerId: ownerId, password: password})
        user.save().then(data => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(500).send(error)
        })
    } else {
        res.status(401).send('User is not logged in.');
    }
}

async function createAdmin(req: Request, res: Response) {
    const email = req.body.email
    const isAdmin = true
    const name = req.body.name
    const _id = new mongoose.Types.ObjectId()
    const ownerId = _id
    const password = req.body.password

    const user = new User({email: email, isAdmin: isAdmin, name: name, _id: _id, ownerId: ownerId, password: password})
    user.save().then(data => {
        res.status(200).send(data)
    }).catch(error => {
        res.status(500).send(error)
    })
}

async function deleteUser(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res);
        if (!isAdmin) {
            res.status(403).send('User is not an admin.');
            return;
        }
        // TODO: Inactivate user only if owner_id is the same as the logged in user

        const query = User.findByIdAndUpdate(req.params.id, {isActive: false});
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    } else {
        res.status(401).send('User is not logged in.');
    }
}

async function deleteUserPermanently(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res);
        if (!isAdmin) {
            res.status(403).send('User is not an admin.');
            return;
        }

        // TODO: Delete user only if owner_id is the same as the logged in user

        const query = User.findByIdAndDelete(req.params.id);
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    } else {
        res.status(401).send('User is not logged in.');
    }
}

export const controller = {
    getUsers,
    getUser,
    createAdmin,
    createUser,
    deleteUser,
    deleteUserPermanently
}