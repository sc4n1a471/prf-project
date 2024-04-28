import mongoose, { Document, Model, Schema } from "mongoose"

export interface IDynamicPrice extends Document {
    isActive: boolean
    attendees: number
    userId: Schema.Types.ObjectId
    price: number
}

const DynamicPriceSchema: Schema<IDynamicPrice> = new mongoose.Schema({
    isActive: { type: Boolean, required: false, default: true },
    attendees: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
})

export const DynamicPrice: Model<IDynamicPrice> = mongoose.model<IDynamicPrice>("DynamicPrice", DynamicPriceSchema)
