import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, IsArray,IsObject } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum ComparisonOperator {
  EQ = 'EQ',
  GE = 'GE',
  // Add more comparison operators if needed
}

class Where {
  @IsNotEmpty()
  @IsString()
  field: string;

  @IsNotEmpty()
  @IsIn(Object.values(ComparisonOperator))
  operation: ComparisonOperator;
  

  @IsNotEmpty()
  @IsString()
  value: string;
}

class Pagination {
  @IsNotEmpty()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc';

  @IsNotEmpty()
  @IsNumber()
  @Type(()=> Number)
  page: number;

  @IsNotEmpty()
  @Type(()=> Number)
  @IsNumber()
  pageSize: number;

  @IsNotEmpty()
  @IsString({ each: true })
  sortBy: string[];
}

export class FilterDTO {
  @IsNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  select?: string[];

  // @IsArray()
  // @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => Where)
  @IsOptional()
  where?: Where[];

  @Type(() => Pagination)
  @ValidateNested({ each: true })
  pagination: Pagination;

}

export class QueryDTO {
    @IsOptional()
    query: FilterDTO;
}