import mongoose, { Document, Model, Schema } from 'mongoose';
import { PassInUse } from './PassInUse';
import { Service } from './Service';

interface IIncome extends Document {
    isActive: boolean;
    amount: number;
    comment?: string;
    createdAt: Date;
    userId: Schema.Types.ObjectId;
    passInUseId?: Schema.Types.ObjectId;
    passInUse?: typeof PassInUse;
    serviceId?: Schema.Types.ObjectId;
    service?: typeof Service;
    updatedAt: Date;
    payerId: Schema.Types.ObjectId;
    name: string;
    isPaid: boolean;
}

const IncomeSchema: Schema<IIncome> = new mongoose.Schema({
    isActive: { type: Boolean, required: false, default: true },
    comment: { type: String, required: false },
    createdAt: { type: Date, required: false, default: Date.now },
    userId: { type: Schema.Types.ObjectId, required: true },
    passInUseId: { type: Schema.Types.ObjectId, required: false },
    serviceId: { type: Schema.Types.ObjectId, required: false },
    updatedAt: { type: Date, required: false, default: Date.now },
    payerId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },
});

export const Income: Model<IIncome> = mongoose.model<IIncome>('Income', IncomeSchema);