import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { ResponseData } from 'src/admin/global/globalClass'
import { ActionUserDto, AddressDto, GeneralInformationDto, PaginationCustomerDto, PaginationDto, PaginationPaymentDto, ReviewDto } from 'src/admin/dto/customer.dto'
import { CustomerDto } from 'src/admin/dto/customer.dto'
import { HttpMessage, HttpStatus } from 'src/admin/global/globalEnum'
import { address, job } from '@prisma/client'

@Controller('/api/customer')
export class CustomerController {

    constructor(private customerService: CustomerService){}

    @Get()
    async getCustomer(
        @Query() paginationDto: PaginationCustomerDto
     ): Promise<ResponseData<{ customers: CustomerDto[], totalPages: number, page: number}>> {
        try {
            const data = await this.customerService.getCustomers(paginationDto)
            return new ResponseData<{customers: CustomerDto[], totalPages: number, page: number}>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{ customers: CustomerDto[], totalPages: number, page: number }>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('/:id')
    async getGeneralInformationById(
        @Param('id') id: number
    ): Promise<ResponseData<{any: any}>> {
        try {
            const data = await this.customerService.getGeneralInformation(id)
            return new ResponseData<{ any: any}>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{ any: any}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('/:id/job')
    async getJobs(
        @Param('id') id: number,
        @Query() paginationDto: PaginationDto
    ): Promise<ResponseData<{ any: any, totalPages: number, page: number}>> {
        try {
            const job = await this.customerService.getJob(id, paginationDto)

            return new ResponseData<{any, totalPages: number, page: number}>(job, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<any>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('/:id/reviews')
    async getReviews(
        @Param('id') id: number,
        @Query() paginationDto: PaginationDto
    ): Promise<ResponseData<{ reviews: ReviewDto[], totalPages: number, page: number}>> {
        try {
            const reviews = await this.customerService.getReviews(id, paginationDto)
            return new ResponseData<{reviews: ReviewDto[], totalPages: number, page: number}>(reviews, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<any>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Put(':id')
    async forceLogoutUser(
        @Param('id') id: number
    ): Promise<ResponseData<boolean>> {
        try {
            const isLogout = await this.customerService.forceLogoutUser(id)
            return new ResponseData<boolean>(isLogout, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<boolean>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Put('soft-delete/:id')
    async softDeleteCustomer(
        @Param('id') id: number, 
        @Body() actionUser : ActionUserDto
    ): Promise<ResponseData<boolean>> {
        try {
            const isDelete = await this.customerService.softDeleteCustomer(id, actionUser)
            return new ResponseData<boolean>(isDelete, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<boolean>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Put('restore/:id')
    async restoreCustomer(
        @Param('id') id: number,
        @Body() actionUser: ActionUserDto
    ): Promise<ResponseData<boolean>> {
        try {
            const isRestore = await this.customerService.restoreCustomer(id, actionUser)
            return new ResponseData<boolean>(isRestore, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<boolean>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }


    @Get('/:id/payment')
    async getCustomerPayment(
        @Param('id') id: number,
        @Query() paginationDto: PaginationPaymentDto
    ) {
        try {
            const payment = await this.customerService.getPayment(id, paginationDto)
            return new ResponseData<{any, totalPages: number, page: number}>(payment, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<any>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('/:id/address')
    async getAddress(
        @Param('id') id: number,
        @Query() paginationDto: PaginationPaymentDto
    ) {
        try {
            const address = await this.customerService.getAddress(id, paginationDto)
            return new ResponseData<{any, totalPages: number, page: number}>(address, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<any>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Put('information')
    async updateGeneralInformation(@Body() paginationDto: GeneralInformationDto): Promise<ResponseData<any>> 
    {
        console.log('[DEBUG]: ')
        try {
            // const data = await this.customerService.updateGeneralInformation(paginationDto)
            const data = paginationDto
            return new ResponseData<any>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            console.log('[DEBUG]: ', error)
            return new ResponseData<any>(null, HttpStatus.ERROR, error.message)
        }
    }
}