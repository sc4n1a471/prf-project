import mongoose, { Document, Model, PopulatedDoc, Schema } from 'mongoose';
import { IPassInUse } from './PassInUse';
import { IService } from './Service';

export interface IIncome extends Document {
    isActive: boolean;
    amount: number;
    comment?: string;
    createdAt: Date;
    userId: Schema.Types.ObjectId;
    passInUseId?: Schema.Types.ObjectId;
    passInUse?: PopulatedDoc<IPassInUse & Document>;
    serviceId?: Schema.Types.ObjectId;
    service?: PopulatedDoc<IService & Document>;
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
    passInUse: { type: Schema.Types.ObjectId, ref: 'PassInUse' },
    serviceId: { type: Schema.Types.ObjectId, required: false },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    updatedAt: { type: Date, required: false, default: Date.now },
    payerId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },
});

export const Income: Model<IIncome> = mongoose.model<IIncome>('Income', IncomeSchema);