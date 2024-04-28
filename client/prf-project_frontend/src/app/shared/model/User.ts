import { Pass } from "./Pass";
import { PassInUse } from "./PassInUse";
import { Service } from "./Service";

export interface User {
    createdAt: Date;
    email: string;
    isActive: boolean;
    isAdmin: boolean;
    name: string;
    _id: string;
    ownerId: string;
    updatedAt: Date;
    services?: Service[];
    passes?: Pass[];
    passesInUse: PassInUse[];
    // myUsers: User[];
}
