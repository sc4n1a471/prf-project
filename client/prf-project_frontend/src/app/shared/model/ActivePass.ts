import { Pass } from "./Pass";
import { User } from "./User";

export interface ActivePass {
    _id: string;
    passId: string;
    userId: string;
    validFrom: Date;
    validUntil: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    pass: Pass;
    user: User;
    payerId: string;
    comment: string;
    occasions: number;
}

export interface ActivePassCreate {
    passId: string;
    validFrom: Date;
    validUntil: Date;
    payerId: string;
    comment: string;
}