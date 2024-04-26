import mongoose, { Document, Model, Schema } from 'mongoose';
import { DynamicPrice } from './DynamicPrice';

interface IService extends Document {
    isActive: boolean;
    comment?: string,
    createdAt: Date,
    name: string;
    userId: Schema.Types.ObjectId;
    prevServiceId: Schema.Types.ObjectId;
    price: number;
    dynamicPrices?: typeof DynamicPrice[];
}

const ServiceSchema: Schema<IService> = new mongoose.Schema({
    isActive: { type: Boolean, required: false, default: true},
    comment: { type: String, required: false },
    createdAt: { type: Date, required: false, default: Date.now},
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true},
    prevServiceId: { type: Schema.Types.ObjectId, required: false },
    price: { type: Number, required: true },
});

export const Service: Model<IService> = mongoose.model<IService>('Service', ServiceSchema);