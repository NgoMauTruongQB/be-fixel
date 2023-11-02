import { Transform, TransformFnParams } from "class-transformer"
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class PaginationFixelistDto {
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

    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    username: string

    @IsOptional()
    @IsNumber()
    @Transform(({ value }: TransformFnParams) => parseInt(value, 10), { toClassOnly: true })
    status: number

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value), { toClassOnly: true })
    startDate: Date

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value), { toClassOnly: true })
    endDate: Date
}

export class PaginationDto {
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
}

export class ReviewDto {
    job_id: number
    job_code: string
    star_for_customer: number
    content_for_customer: string
}

