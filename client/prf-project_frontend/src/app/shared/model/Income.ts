import { PassInUse } from './PassInUse';
import { Service } from './Service';

export interface Income {
    _id: string;
    isActive: boolean;
    amount: number;
    comment?: string;
    createdAt: Date;
    userId: string;
    passInUseId?: string;
    passInUse?: PassInUse;
    serviceId?: string;
    service?: Service;
    updatedAt: Date;
    payerId: string;
    name: string;
    isPaid: boolean;
}
