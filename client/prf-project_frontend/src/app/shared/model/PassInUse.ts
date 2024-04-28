import { Pass } from "./Pass";

export interface PassInUse {
    _id: string;
    passId: string;
    userId: string;
    validFrom: Date;
    validUntil: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    pass: Pass;
    payerId: string;
    comment: string;
    occasions: number;
}