import { ParseBoolPipe } from '@nestjs/common'
import { Transform, TransformFnParams } from 'class-transformer'
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Min } from 'class-validator'

export class CustomerDto {

    @IsNumber()
    @IsNotEmpty()
    id?: number

    @IsString()
    @IsNotEmpty()
    uuid?: string

    @IsEmail()
    @IsNotEmpty()
    email?: string

    @IsNotEmpty()
    @IsString()
    user_name?: string

    @IsOptional()
    mobile_number?: string

    @IsNotEmpty()
    @IsNumber()
    status?: number

    @IsOptional()
    avatar?: string

    @IsOptional()
    @IsString()
    name?: string
}

export class PaginationCustomerDto {
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
    @IsString()
    username: string

    @IsOptional()
    email: string

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => parseInt(value, 10), { toClassOnly: true })
    status: number

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value), { toClassOnly: true })
    startDate: Date

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value), { toClassOnly: true })
    endDate: Date
}

export class ActionUserDto {
    @IsNotEmpty()
    user_id? : number
}

export class AddressDto {
    @IsOptional()
    @IsBoolean()
    is_default?: boolean

    @IsNotEmpty()
    blk_no?: string

    @IsOptional()
    @IsNumberString()
    floor?: string

    @IsOptional()
    @IsNumberString()
    unit_no?: string

    @IsOptional()
    @IsString()
    building?: string

    @IsOptional()
    @IsString()
    street?: string

    @IsNotEmpty()
    @IsString()
    country?: string

    @IsOptional()
    @IsString()
    post_code?: string

    @IsNotEmpty()
    @IsBoolean()
    is_home?: boolean

    @IsNotEmpty()
    @IsNumber()
    update_by?: number

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

export class PaginationPaymentDto {
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
    @IsString()
    job_code: string

    @IsOptional()
    @IsBoolean()
    status: boolean
}

export class ReviewDto {
    job_id: number
    job_code: string
    star_for_handyman: number
    content_for_handyman: string
}