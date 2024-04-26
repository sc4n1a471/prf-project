import mongoose, { Document, Model, Schema } from 'mongoose';
import { Service } from './Service';

interface IPass extends Document {
    isActive: boolean;
    comment?: string;
    createdAt: Date;
    duration: string;
    name: string;
    occasionLimit: number;
    userId: Schema.Types.ObjectId;
    prevPassId: Schema.Types.ObjectId;
    price: number;
    servies: typeof Service[];
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
});

export const Pass: Model<IPass> = mongoose.model<IPass>('Pass', PassSchema);