import mongoose, { Document, Model, PopulatedDoc, Schema } from 'mongoose';
import { IService } from './Service';

export interface IPass extends Document {
    isActive: boolean;
    comment?: string;
    createdAt: Date;
    duration: string;
    name: string;
    occasionLimit: number;
    userId: Schema.Types.ObjectId;
    prevPassId: Schema.Types.ObjectId;
    price: number;
    services: PopulatedDoc<IService & Document>;
}

const PassSchema: Schema<IPass> = new mongoose.Schema({
    isActive: { type: Boolean, required: false, default: true },
    comment: { type: String, required: false },
    createdAt: { type: Date, required: false, default: Date.now },
    duration: { type: String, required: true },
    name: { type: String, required: true },
    occasionLimit: { type: Number, required: false },
    userId: { type: Schema.Types.ObjectId, required: true },
    prevPassId: { type: Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    services: [{ type: Schema.Types.ObjectId, ref: 'Service'}],
});

export const Pass: Model<IPass> = mongoose.model<IPass>('Pass', PassSchema);