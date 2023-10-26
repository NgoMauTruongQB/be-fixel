import { ParseBoolPipe } from '@nestjs/common'
import { Transform, TransformFnParams } from 'class-transformer'
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

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
    mobile_number: string
}