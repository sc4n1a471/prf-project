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
        
        const query = User.find();
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
        const ownerId = _id
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

export const controller = {
    getUsers,
    createAdmin,
    createUser
}