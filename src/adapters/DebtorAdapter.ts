import { BaseAdapter, QueryBuilder } from "@/adapters/BaseAdapter";
import { Debtor } from "@/types/Debtor";
import { parseNumber, parseObject, parseString } from "@/utils/parsers";

export class DebtorAdapter extends BaseAdapter<Debtor> {
    public userId: number;

    get model(): string {
        return 'Debtor';
    }

    public buildUrl(queryBuilder: QueryBuilder | null = null): string {
        const query = queryBuilder?.toString() ?? '';
        return `${this.host}/${this.model}/${this.userId}${query}`;
    }

    public getEmptyRecord(): Debtor {
        return {
            id: 0,
            name: '',
            amount: 0,
            user: this.userId,
        };
    }

    parser(record: unknown): Debtor {
        const obj = parseObject(record);

        return {
            id: parseNumber(obj.id),
            name: parseString(obj.name),
            amount: parseNumber(obj.amount),
            user: parseNumber(obj.user),
        }
    }

    constructor(userId: number) {
        super();
        this.userId = userId;
    }
}