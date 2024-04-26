import mongoose, { Document, Model, Schema } from 'mongoose';
import { Pass } from './Pass';

interface IPassInUse extends Document {
    isActive: boolean;
    comment?: string;
    createdAt: Date;
    occasions: number;
    userId: Schema.Types.ObjectId;
    passId: Schema.Types.ObjectId;
    pass: typeof Pass;
    payerId: Schema.Types.ObjectId;
    validFrom: Date;
    validUntil: Date;
}

const PassInUseSchema: Schema<IPassInUse> = new mongoose.Schema({
    isActive: { type: Boolean, required: false, default: true},
    comment: { type: String, required: false },
    createdAt: { type: Date, required: false, default: Date.now},
    occasions: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    passId: { type: Schema.Types.ObjectId, required: true},
    payerId: { type: Schema.Types.ObjectId, required: true},
    validFrom: { type: Date, required: false },
    validUntil: { type: Date, required: false },
});

export const PassInUse: Model<IPassInUse> = mongoose.model<IPassInUse>('PassInUse', PassInUseSchema);