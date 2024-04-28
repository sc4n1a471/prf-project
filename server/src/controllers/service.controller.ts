import { Request, Response } from "express"
import { Service } from "../model/Service"
import * as auth from "./auth.controller"
import * as dp from "./dp.controller"

async function getServices(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = await auth.controller.checkAdmin(req, res)
        if (!isAdmin) {
            res.status(403).send("User is not an admin.")
            return
        }

        Service.find({ userId: req.user, isActive: true })
            .populate("dynamicPrices")
            .exec()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).send("Internal server error.")
            })
    } else {
        res.status(401).send("User is not logged in.")
    }
}

async function getService(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        Service.findById(req.params.id)
            .populate("dynamicPrices")
            .exec()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).send("Internal server error.")
            })
    } else {
        res.status(401).send("User is not logged in.")
    }
}

async function createService(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res)
        if (!isAdmin) {
            res.status(403).send("User is not an admin.")
            return
        }

        const name = req.body.name
        const price = req.body.price
        const comment = req.body.comment
        const userId = req.user

        const dynamicPrices = req.body.dynamicPrices
        if (dynamicPrices) {
            const dps = await dp.controller.createDynamicPrices(dynamicPrices, userId.toString())
            if (!dps) {
                res.status(500).send("Internal server error.")
                return
            }

            const service = new Service({
                name: name,
                price: price,
                comment: comment,
                userId: userId,
                dynamicPrices: dps,
            })
            service
                .save()
                .then(async (data) => {
                    res.status(201).send(data)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).send("Internal server error.")
                })
        } else {
            const service = new Service({ name: name, price: price, comment: comment, userId: userId })
            service
                .save()
                .then(async (data) => {
                    res.status(201).send(data)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).send("Internal server error.")
                })
        }
    } else {
        res.status(401).send("User is not logged in.")
    }
}

async function updateService(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res)
        if (!isAdmin) {
            res.status(403).send("User is not an admin.")
            return
        }

        const existingService = await Service.findById(req.params.id)
        if (!existingService) {
            res.status(404).send("Service not found.")
            return
        }

        if (existingService.userId !== req.user) {
            res.status(403).send("User is not the owner of the requested service.")
            return
        }

        let update = true
        if (req.body.name || req.body.comment) {
            update = false
        }

        // Ideally here I would need to check if the service is required to be updated only or
        // if not, then I need to deactivate the service, create a new one and update the dynamic prices if
        // those are not updated but since I won't be using this backend for the real project (already have one in GO),
        // I won't implement that.
        const query = Service.findByIdAndUpdate(req.params.id, req.body)
        query
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).send("Internal server error.")
            })
    } else {
        res.status(401).send("User is not logged in.")
    }
}

async function deleteService(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        const isAdmin = auth.controller.checkAdmin(req, res)
        if (!isAdmin) {
            res.status(403).send("User is not an admin.")
            return
        }

        const existingService = await Service.findById(req.params.id)
        if (!existingService) {
            res.status(404).send("Service not found.")
            return
        }

        if (existingService.userId !== req.user) {
            res.status(403).send("User is not the owner of the requested service.")
            return
        }

        const query = await Service.findByIdAndUpdate(req.params.id, { isActive: false })
        if (query) {
            const success = await dp.controller.deleteDynamicPrices(existingService._id)
            if (!success) {
                res.status(500).send("Internal server error.")
                return
            }
            res.status(200).send("Service deleted.")
        } else {
            res.status(500).send("Internal server error.")
        }
    } else {
        res.status(401).send("User is not logged in.")
    }
}

export const controller = {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
}
