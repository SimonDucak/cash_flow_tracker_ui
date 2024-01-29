import { BaseAdapter, QueryBuilder } from "@/adapters/BaseAdapter";
import { DueType } from "@/types/DueType";
import { ExpectedOutcome } from "@/types/ExpectedOutcome";
import { parseDate, parseNumber, parseObject, parseString } from "@/utils/parsers";

export class ExpectedOutcomeAdapter extends BaseAdapter<ExpectedOutcome> {
    public userId: number;

    get model(): string {
        return 'ExpectedOutcome';
    }

    public buildUrl(queryBuilder: QueryBuilder | null = null): string {
        const query = queryBuilder?.toString() ?? '';
        return `${this.host}/${this.model}/${this.userId}${query}`;
    }

    public getEmptyRecord(): ExpectedOutcome {
        return {
            id: 0,
            title: '',
            dueType: DueType.MONTHLY,
            dateFrom: new Date(),
            dateTo: new Date(),
            amount: 0,
            user: this.userId,
        };
    }

    parser(record: unknown): ExpectedOutcome {
        const obj = parseObject(record);

        return {
            id: parseNumber(obj.id),
            title: parseString(obj.title),
            dueType: DueType.MONTHLY,
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