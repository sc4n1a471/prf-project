import { Request, Response } from "express"
import mongoose from "mongoose"
import { DynamicPrice } from "../model/DynamicPrice"

async function getDynamicPrices(req: Request, res: Response) {
	const query = DynamicPrice.find()
	query
		.then((data) => {
			res.status(200).send(data)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).send("Internal server error.")
		})
}

async function createDynamicPrices(dynamicPrices: any[], userId: string) {
	dynamicPrices.forEach((dynamicPrice: any) => {
		dynamicPrice.userId = userId
		// dynamicPrice.serviceId = serviceId;
	})

	const query = DynamicPrice.insertMany(dynamicPrices)
	return query
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.log(error)
			return error
		})
}

async function deleteDynamicPrices(serviceId: mongoose.Schema.Types.ObjectId): Promise<boolean> {
	const query = await DynamicPrice.updateMany({ service_id: serviceId }, { isActive: false })

	if (query) {
		return true
	}
	return false
}

export const controller = {
	createDynamicPrices,
	deleteDynamicPrices,
	getDynamicPrices,
}
