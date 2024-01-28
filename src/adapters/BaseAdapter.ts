export abstract class BaseAdapter<T extends { id: number }> {
    abstract get model(): string;

    abstract parser(record: unknown): T;

    public host: string = 'http://localhost:5291/api';

    public buildUrl(queryBuilder: QueryBuilder | null = null): string {
        const query = queryBuilder?.toString() ?? '';
        return `${this.host}/${this.model}${query}`;
    }

    public async  getRecord(id: number): Promise<T | null> {
        const url = `${this.buildUrl()}/${id}`;
        
        const response = await fetch(url);

        const data = await this._parseResponse(response);

        return this.parser(data);
    }
    
    public async getRecords(queryBuilder: QueryBuilder = new QueryBuilder().addPagination()): Promise<T[]> {
        const url = this.buildUrl(queryBuilder);

        const response = await fetch(url);

        const data = await this._parseResponse(response);

        if (!Array.isArray(data)) {
            throw new Error('Expected array');
        }

        return data.map(this.parser);
    }
    
    public async createRecord(data: T): Promise<T> {
        const url = this.buildUrl();

        const payload = this._serialize({...data, id: null});

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },  
            body: payload,
        });

        const newRecordData = await this._parseResponse(response);

        return this.parser(newRecordData);
    }
    
    public async updateRecord(data: T): Promise<void> {
        const url = `${this.buildUrl()}/${data.id}`;

        const payload = this._serialize(data);

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
        });

        this._resolveResponseStatus(response);
    }
    
    public async deleteRecord(id: number): Promise<void> {
        const url = `${this.buildUrl()}/${id}`;

        const response = await fetch(url, {
            method: 'DELETE',
        });

        this._resolveResponseStatus(response);
    }

    private _resolveResponseStatus(response: Response): void {
        if (response.status >= 200 && response.status < 300) {
            return;
        } else {
            throw new Error(response.statusText);
        }
    }

    private _parseResponse(response: Response): unknown {
        if (response.status >= 200 && response.status < 300) {
            try {
                return response.json();
            } catch (err) {
                return null;
            }
        } else {
            throw new Error(response.statusText);
        }
    }

    private _serialize(data: T): string {
        return JSON.stringify(data, (_key, value) => {
            if (value instanceof Date) {
                return value.toISOString();
            }
            return value;
        });
    }
}

export type QueryParam = {
    key: string;
    value: string;
}

class QueryBuilder {
    private _params: QueryParam[] = [];

    public addParam(key: string, value: string): QueryBuilder {
        this._params.push({ key, value });
        return this;
    }

    public removeParam(key: string): QueryBuilder {
        this._params = this._params.filter(param => param.key !== key);
        return this;
    }

    public addPagination(pageNumber: number = 1, pageSize: number = 10): QueryBuilder {
        this.addParam('pageNumber', pageNumber.toString());
        this.addParam('pageSize', pageSize.toString());
        return this;
    }

    public toString(): string {
        let query = "?";
        this._params.forEach(param => {
            query += `${param.key}=${param.value}&`;
        });
        return query;
    } 
}