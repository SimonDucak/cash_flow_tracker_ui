import { BaseAdapter, QueryBuilder } from "@/adapters/BaseAdapter";
import { SavingGoal } from "@/types/SavingGoal";
import { parseDate, parseNumber, parseObject, parseString } from "@/utils/parsers";

export class SavingGoalAdapter extends BaseAdapter<SavingGoal> {
    public userId: number;

    get model(): string {
        return 'SavingGoal';
    }

    public buildUrl(queryBuilder: QueryBuilder | null = null): string {
        const query = queryBuilder?.toString() ?? '';
        return `${this.host}/${this.model}/${this.userId}${query}`;
    }

    public getEmptyRecord(): SavingGoal {
        return {
            id: 0,
            name: '',
            dateFrom: new Date(),
            dateTo: new Date(),
            amount: 0,
            user: this.userId,
        };
    }

    parser(record: unknown): SavingGoal {
        const obj = parseObject(record);

        return {
            id: parseNumber(obj.id),
            name: parseString(obj.name),
            dateFrom: parseDate(obj.dateFrom),
            dateTo: parseDate(obj.dateTo),
            amount: parseNumber(obj.amount),
            user: parseNumber(obj.user),
        }
    }

    constructor(userId: number) {
        super();
        this.userId = userId;
    }
}