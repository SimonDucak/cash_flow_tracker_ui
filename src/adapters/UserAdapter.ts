import { BaseAdapter } from "@/adapters/BaseAdapter";
import { User } from "@/types/User";
import { parseNumber, parseObject, parseString } from "@/utils/parsers";

export class UserAdapter extends BaseAdapter<User> {
    get model(): string {
        return 'User';
    }

    public getEmptyRecord(): User {
        return {
            id: 0,
            name: '',
        }
    }

    parser(record: unknown): User {
        const obj = parseObject(record);

        return {
            id: parseNumber(obj.id),
            name: parseString(obj.name),
        }
    }
}