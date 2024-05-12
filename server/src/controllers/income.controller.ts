import { Request, Response } from "express"
import mongoose from "mongoose"
import { IDynamicPrice } from "../model/DynamicPrice"
import { IIncome, Income } from "../model/Income"
import { Service } from "../model/Service"
import * as passInUse from "./activePass.controller"
import * as auth from "./auth.controller"

async function createIncomeMultipleUsersWrapper(req: Request, res: Response) {
	if (req.isAuthenticated()) {
		const isAdmin = auth.controller.checkAdmin(req, res)
		if (!isAdmin) {
			res.status(403).send("User is not an admin.")
			return
		}

		const serviceIds = req.body.serviceIds
		const passInUseIds = req.body.passInUseIds
		const payerIds = req.body.payerIds

		const amount = req.body.amount
		const comment = req.body.comment
		const userId = req.user
		const isPaid = req.body.isPaid

		for (const payerId of payerIds) {
			let income = new Income({
				payerId: payerId,
				amount: amount,
				comment: comment,
				userId: userId,
				isPaid: isPaid,
			})

			if (serviceIds.length > 0) {
				for (const serviceId of serviceIds) {
					income.serviceId = serviceId

					income.name = req.body.name
					if (income.name == null) {
						income.name = "Empty name"
					}

					try {
						await createIncome(income, payerIds.length)
						console.log("Income was created...")
					} catch (error) {
						console.log(error)
						res.status(500).send("Internal server error.")
					}
				}
			} else if (passInUseIds.length > 0) {
				// TODO: replace .forEach with for of (however, this backend will not be used in the future, sooo wontfix I guess)
				passInUseIds.forEach((passInUseId: mongoose.Schema.Types.ObjectId) => {
					income.passInUseId = passInUseId
					createIncome(income, payerIds.length)
						.then((data) => {
							res.status(201).send(data)
							return
						})
						.catch((error) => {
							console.log(error)
							res.status(500).send("Internal server error.")
						})
				})
			}
		}

		console.log("Incomes created successfully.")
		res.status(201).send({
			message: "Incomes created successfully.",
		})
	} else {
		res.status(401).send("User is not logged in.")
	}
}

async function createIncome(income: IIncome, numOfAttendees: number = 1) {
	if (income.serviceId) {
		const service = await Service.findById(income.serviceId).populate("dynamicPrices").exec()
		if (!service) {
			return null
		}

		const usePassInUseResult = await passInUse.controller.usePassInUse(income.payerId, income.serviceId)
		if (usePassInUseResult == null) {
			return null
		}

		if (!usePassInUseResult) {
			income.amount = service.price

			// DynamicPrice handling
			if (service.dynamicPrices.length > 0) {
				service.dynamicPrices.forEach((dp: IDynamicPrice) => {
					if (dp.attendees >= numOfAttendees) {
						income.amount = dp.price
						console.log("Dynamic price found: " + dp.price)
					}
				})
			}
		} else {
			income.amount = 0 // Has valid passInUse
		}
	}

	return income.save()
}

async function getIncomes(req: Request, res: Response) {
	if (req.isAuthenticated()) {
		const isAdmin = auth.controller.checkAdmin(req, res)
		if (!isAdmin) {
			Income.find({ payerId: req.user, isActive: true })
				.then((data) => {
					res.status(200).send(data)
				})
				.catch((error) => {
					console.log(error)
					res.status(500).send("Internal server error.")
				})
		} else {
			Income.find({ userId: req.user, isActive: true })
				.then((data) => {
					res.status(200).send(data)
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

async function getIncome(req: Request, res: Response) {
	if (req.isAuthenticated()) {
		const isAdmin = auth.controller.checkAdmin(req, res)
		if (!isAdmin) {
			Income.find({ payerId: req.user, isActive: true, _id: req.params.id })
				.then((data) => {
					res.status(200).send(data)
				})
				.catch((error) => {
					console.log(error)
					res.status(500).send("Internal server error.")
				})
		} else {
			Income.find({ userId: req.user, isActive: true, _id: req.params.id })
				.then((data) => {
					res.status(200).send(data)
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

async function updateIncome(req: Request, res: Response) {
	if (req.isAuthenticated()) {
		const isAdmin = auth.controller.checkAdmin(req, res)
		if (!isAdmin) {
			res.status(403).send("User is not an admin.")
		} else {
			Income.findOneAndUpdate({ userId: req.user, _id: req.params.id }, req.body)
				.then((data) => {
					res.status(200).send(data)
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

async function deleteIncome(req: Request, res: Response) {
	if (req.isAuthenticated()) {
		const isAdmin = auth.controller.checkAdmin(req, res)
		if (!isAdmin) {
			res.status(403).send("User is not an admin.")
		} else {
			Income.findOneAndUpdate({ userId: req.user, _id: req.params.id }, { isActive: false })
				.then((data) => {
					res.status(200).send(data)
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

export const controller = {
	createIncomeMultipleUsersWrapper,
	createIncome,
	getIncomes,
	getIncome,
	updateIncome,
	deleteIncome,
}
