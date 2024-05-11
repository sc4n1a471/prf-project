import { Service } from "./Service";

export interface Pass {
    _id: string;
    isActive: boolean;
    comment: string;
    createdAt: Date;
    duration: string;
    name: string;
    occasionLimit: number;
    userId: string;
    prevPassId: string;
    price: number;
    services: Service[];
}

export interface PassCreate {
    name: string;
    price: number;
    occasion_limit: number;
    comment: string;
    duration: string;
    service_ids: string[];
}