import { Request, Response } from "express";
import { Income, IIncome } from "../model/Income";
import { Service } from "../model/Service";
import * as auth from "./auth.controller";

async function createIncomeWrapper(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res);
        if (!isAdmin) {
            res.status(403).send("User is not an admin.");
            return;
        }

        const amount = req.body.amount;
        const comment = req.body.comment;
        const userId = req.user;
        const passInUseId = req.body.passInUseId;
        const serviceId = req.body.serviceId;
        const payerId = req.body.payerId;
        const name = req.body.name;
        const isPaid = req.body.isPaid;

        const income = new Income({
            amount,
            comment,
            userId,
            passInUseId,
            serviceId,
            payerId,
            name,
            isPaid,
        });
        createIncome(income)
            .then((data) => {
                res.status(201).send(data);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
    } else {
        res.status(401).send("User is not logged in.");
    }
}

async function createIncome(income: IIncome) {

    if (income.serviceId) {
        const service = await Service.findById(income.serviceId).populate("dynamicPrices").exec();
        if (!service) {
            return null;
        }

        // TODO: Implement dynamic price calculation
        // TODO: Implement passInUse usage
    }

    return income.save();
}

async function getIncomes(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res);
        if (!isAdmin) {
            Income.find({ payerId: req.user, isActive: true })
                .then((data) => {
                    res.status(200).send(data);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send("Internal server error.");
                });
        } else {
            Income.find({ userId: req.user, isActive: true })
                .then((data) => {
                    res.status(200).send(data);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send("Internal server error.");
                });
        }
    } else {
        res.status(401).send("User is not logged in.");
    }
}

async function getIncome(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res);
        if (!isAdmin) {
            Income.find({ payerId: req.user, isActive: true, _id: req.params.id })
                .then((data) => {
                    res.status(200).send(data);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send("Internal server error.");
                });
        } else {
            Income.find({ userId: req.user, isActive: true, _id: req.params.id })
                .then((data) => {
                    res.status(200).send(data);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send("Internal server error.");
                });
        }
    } else {
        res.status(401).send("User is not logged in.");
    }
}

async function updateIncome(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res);
        if (!isAdmin) {
            res.status(403).send("User is not an admin.");
        } else {
            Income.findOneAndUpdate({ userId: req.user, _id: req.params.id },req.body)
                .then((data) => {
                    res.status(200).send(data);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send("Internal server error.");
                });
        }
    } else {
        res.status(401).send("User is not logged in.");
    }
}

async function deleteIncome(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res);
        if (!isAdmin) {
            res.status(403).send("User is not an admin.");
        } else {
            Income.findOneAndUpdate({ userId: req.user, _id: req.params.id }, { isActive: false })
                .then((data) => {
                    res.status(200).send(data);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send("Internal server error.");
                });
        }
    } else {
        res.status(401).send("User is not logged in.");
    }
}

export const controller = {
    createIncomeWrapper,
    createIncome,
    getIncomes,
    getIncome,
    updateIncome,
    deleteIncome,
};
