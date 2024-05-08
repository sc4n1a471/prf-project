import { Request, Response } from 'express';
import { IPassInUse, PassInUse } from '../model/PassInUse';
import { Income } from '../model/Income';
import * as auth from './auth.controller';
import * as income from './income.controller';
import mongoose from 'mongoose';
import { Pass } from '../model/Pass';

async function getPassesInUse(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = await auth.controller.checkAdmin(req, res);
        if (isAdmin) {
            PassInUse.find({userId: req.user, isActive: true}).populate('pass').exec()
            .then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            PassInUse.find({payerId: req.user, isActive: true}).populate('pass').exec()
            .then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        }
        
    } else {
        res.status(401).send('User is not logged in.');
    }
}

async function getPassInUse(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        PassInUse.findById(req.params.id).populate('pass').exec()
            .then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
    } else {
        res.status(401).send('User is not logged in.');
    }
}

async function createPassInUse(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res);
        if (!isAdmin) {
            res.status(403).send('User is not an admin.');
            return;
        }

        const comment = req.body.comment
        const userId = req.user
        const passId = req.body.passId
        const payerId = req.body.payerId
        const validFrom = req.body.validFrom
        const validUntil = req.body.validUntil

        const passInUse = new PassInUse({
            comment,
            userId,
            passId,
            payerId,
            validFrom,
            validUntil
        });

        const pass = await Pass.findById(passId)
        if (!pass) {
            res.status(404).send('Pass not found.')
            return
        }

        passInUse.save().then(data => {
            const newIncome = new Income({
                amount: pass.price,
                userId: data.userId,
                passInUseId: data._id,
                // serviceId: null,
                payerId: data.payerId,
                name: 'Bérlet vásárlás',
                isPaid: true
            });
            const incomeSaveQuery = income.controller.createIncome(newIncome);
            if (!incomeSaveQuery) {
                res.status(500).send('Internal server error.');
                return;
            }
            res.status(201).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    } else {
        res.status(401).send('User is not logged in.');
    }
}

async function deletePassInUse(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res);
        if (!isAdmin) {
            res.status(403).send('User is not an admin.');
            return;
        }

        const existingPassInUse = await PassInUse.findById(req.params.id);
        if (!existingPassInUse) {
            res.status(404).send('PassInUse not found.');
            return;
        }

        if (existingPassInUse.userId !== req.user) {
            res.status(403).send('User is not the owner of the requested passInUse.');
            return;
        }

        const query = await PassInUse.findByIdAndUpdate(req.params.id, {isActive: false});
        if (query) {
            res.status(200).send('Service deleted.');
        } else {
            res.status(500).send('Internal server error.');
        }
    } else {
        res.status(401).send('User is not logged in.');
    }
}

// Helper functions
async function usePassInUse(payerId: mongoose.Schema.Types.ObjectId, serviceId: mongoose.Schema.Types.ObjectId): Promise<boolean | null> {
    const passesInUse = await PassInUse.find({payerId: payerId, isActive: true}).populate('pass').populate('services').exec();
    if (!passesInUse) {
        return null;
    }

    for (const passInUse of passesInUse) {
        const valid = await checkPassInUseValidity(passInUse, serviceId);
        if (valid) {
            passInUse.occasions += 1;
            const query = await passInUse.save();
            if (!query) {
                return null;
            }
            return true;
        }
    }

    return false
}

async function checkPassInUseValidity(passInUse: IPassInUse, serviceId: mongoose.Schema.Types.ObjectId): Promise<boolean> {
    let now = new Date()

    if (passInUse.validFrom > now) {
        return false
    }

    if (!passInUse.pass.occasionLimit) {
        if (passInUse.validUntil < now) {
            await invalidatePassInUse(passInUse._id);
            return false
        }
    } else {
        if (passInUse.validUntil < now || passInUse.occasions >= passInUse.pass.occasionLimit) {
            await invalidatePassInUse(passInUse._id);
            return false
        }
    }

    // Checking if selected service is in the pass' service list
    console.log(`Service is included in pass' service list: ${passInUse.pass.services.includes(serviceId)}`);
    if (!passInUse.pass.services.includes(serviceId)) {
        return false
    }
    return true
}

async function invalidatePassInUse(passInUseId: mongoose.Schema.Types.ObjectId): Promise<boolean> {
    const query = await PassInUse.findByIdAndUpdate(passInUseId, {isActive: false});
    if (query) {
        return true;
    } else {
        return false;
    }
}

export const controller = {
    getPassInUse,
    getPassesInUse,
    createPassInUse,
    deletePassInUse,
    usePassInUse,
}
