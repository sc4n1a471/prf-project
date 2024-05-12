import { Request, Response } from "express"
import mongoose from "mongoose"
import { Pass } from "../model/Pass"
import * as auth from "./auth.controller"

async function getPass(req: Request, res: Response) {
	if (req.isAuthenticated()) {
		Pass.findById(req.params.id)
			.populate("services")
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

async function getPasses(req: Request, res: Response) {
	if (req.isAuthenticated()) {
		const isAdmin = auth.controller.checkAdmin(req, res)
		if (!isAdmin) {
			res.status(403).send("User is not an admin.")
			return
		}

		Pass.find({ userId: req.user, isActive: true })
			.populate("services")
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

async function createPass(req: Request, res: Response) {
	if (req.isAuthenticated()) {
		const isAdmin = auth.controller.checkAdmin(req, res)
		if (!isAdmin) {
			res.status(403).send("User is not an admin.")
			return
		}

		const name = req.body.name
		const price = req.body.price
		const occasionLimit = req.body.occasion_limit
		const comment = req.body.comment
		const duration = req.body.duration
		const userId = req.user
		const serviceIds = req.body.service_ids

		const newPass = new Pass({
			name: name,
			price: price,
			occasionLimit: occasionLimit,
			comment: comment,
			duration: duration,
			userId: userId,
			services: serviceIds,
			prevPassId: new mongoose.Types.ObjectId(), // random objectID for now
		})

		newPass
			.save()
			.then((data) => {
				res.status(201).send(data)
			})
			.catch((error) => {
				console.log(error)
				res.status(500).send("Internal server error.")
			})
	} else {
		res.status(401).send("User is not logged in.")
	}
}

async function updatePass(req: Request, res: Response) {
	if (req.isAuthenticated()) {
		const isAdmin = auth.controller.checkAdmin(req, res)
		if (!isAdmin) {
			res.status(403).send("User is not an admin.")
			return
		}

		const passId = req.params.id
		const name = req.body.name
		const price = req.body.price
		const occasionLimit = req.body.occasion_limit
		const comment = req.body.comment
		const duration = req.body.duration
		const userId = req.user
		const serviceIds = req.body.service_ids

		// Same thing as with Services
		Pass.findByIdAndUpdate(passId, {
			name: name,
			price: price,
			occasionLimit: occasionLimit,
			comment: comment,
			duration: duration,
			userId: userId,
			services: serviceIds,
			prevPassId: passId, // here we can add the previous pass id, currently it is set to the same pass id
		})
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

async function deletePass(req: Request, res: Response) {
	if (req.isAuthenticated()) {
		const isAdmin = auth.controller.checkAdmin(req, res)
		if (!isAdmin) {
			res.status(403).send("User is not an admin.")
			return
		}

		Pass.findByIdAndUpdate(req.params.id, { isActive: false })
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

export const controller = {
	getPass,
	getPasses,
	createPass,
	updatePass,
	deletePass,
}
