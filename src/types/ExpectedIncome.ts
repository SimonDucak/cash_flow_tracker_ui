import { DueType } from "@/types/DueType";

export type ExpectedIncome = {
    id: number;
    title: string;
    dueType: DueType;
    amount: number;
    dateFrom: Date;
    dateTo: Date;
    user: number;
}