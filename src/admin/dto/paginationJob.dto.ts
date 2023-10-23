import { ParseBoolPipe } from '@nestjs/common'
import { Transform, TransformFnParams } from 'class-transformer'
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class PaginationJobDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }: TransformFnParams) => parseInt(value, 10), { toClassOnly: true })
    page: number

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }: TransformFnParams) => parseInt(value, 10), { toClassOnly: true })
    limit: number

    @IsNumber()
    @IsOptional()
    @Min(1)
    @Transform(({ value }: TransformFnParams) => parseInt(value, 10), { toClassOnly: true })
    service_id: number

    @IsNumber()
    @IsOptional()
    @Transform(({ value }: TransformFnParams) => parseInt(value, 10), { toClassOnly: true })
    status: number

    @IsOptional()
    @IsString()
    username: string

    @IsOptional()
    @IsString()
    id: string

    @IsOptional()
    priority: boolean
}