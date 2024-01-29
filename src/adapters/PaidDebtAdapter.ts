import { BaseAdapter, QueryBuilder } from "@/adapters/BaseAdapter";
import { PaidDebt } from "@/types/PaidDebt";
import { parseDate, parseNumber, parseObject } from "@/utils/parsers";

export class PaidDebtAdapter extends BaseAdapter<PaidDebt> {
    public debtorId: number;

    get model(): string {
        return 'PaidDebt';
    }

    public buildUrl(queryBuilder: QueryBuilder | null = null): string {
        const query = queryBuilder?.toString() ?? '';
        return `${this.host}/${this.model}/${this.debtorId}${query}`;
    }

    public getEmptyRecord(): PaidDebt {
        return {
            id: 0,
            amount: 0,
            createdAt: new Date(),
            debtor: this.debtorId,
        };
    }

    parser(record: unknown): PaidDebt {
        const obj = parseObject(record);

        return {
            id: parseNumber(obj.id),
            createdAt: parseDate(obj.createdAt),
            amount: parseNumber(obj.amount),
            debtor: parseNumber(obj.debtor),
        }
    }

    constructor(userId: number) {
        super();
        this.debtorId = userId;
    }
}