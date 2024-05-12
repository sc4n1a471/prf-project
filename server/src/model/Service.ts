import mongoose, { Document, Model, PopulatedDoc, Schema } from "mongoose"
import { IDynamicPrice } from "./DynamicPrice"

export interface IService extends Document {
	isActive: boolean
	comment?: string
	createdAt: Date
	name: string
	userId: Schema.Types.ObjectId
	prevServiceId: Schema.Types.ObjectId
	price: number
	dynamicPrices?: PopulatedDoc<IDynamicPrice & Document>
	_id: Schema.Types.ObjectId
}

const ServiceSchema: Schema<IService> = new mongoose.Schema({
	isActive: { type: Boolean, required: false, default: true },
	comment: { type: String, required: false },
	createdAt: { type: Date, required: false, default: Date.now },
	name: { type: String, required: true },
	userId: { type: Schema.Types.ObjectId, required: true },
	prevServiceId: { type: Schema.Types.ObjectId, required: false },
	price: { type: Number, required: true },
	dynamicPrices: [{ type: Schema.Types.ObjectId, ref: "DynamicPrice" }],
})

export const Service: Model<IService> = mongoose.model<IService>("Service", ServiceSchema)
