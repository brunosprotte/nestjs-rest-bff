import { query } from "express";
import { api } from "./api";

export enum ComparisonOperator {
    EQ = 'EQ',
    GE = 'GE',
}
  
class Pagination {
    order: 'asc' | 'desc';
    page: number;
    pageSize: number;
    sortBy: string[];
}

class Where {
    field: string;
    operation: ComparisonOperator;
    value: string;
}

export class TracemarketQueryBuilder {
    private select: string[];
    private where: Where[];
    private pagination: Pagination;

    constructor() {
        this.select = [],
        this.where = [],
        this.pagination = null
    }

    selectField(field: string) {
        this.select.push(field)
        return this
    }
    
    selectMultipleField(fields: string[]) {
        this.select = this.select.concat(fields)
        return this
    }

    withWhere(clause: Where){
        this.where.push(clause)
        return this
    }

    addAllWhere(clauses: Where[]){
        this.where = this.where.concat(clauses)
        return this
    }

    withPagination(pagination: Pagination){
        this.pagination = pagination
        return this
    }

    buildQuery() {
        const select = this.select.length > 0 ? this.select : '';
        const where = this.where.length > 0 ? this.where : '';

        return JSON.stringify({select, where, pagination: this.pagination})
    }

    async doGet(resource: string) {
        return await api.get(resource, {
            params: this.buildQuery()
        })
    }
}
