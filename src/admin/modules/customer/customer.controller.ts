import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { ResponseData } from 'src/admin/global/globalClass'
import { ActionUserDto, AddressDto, PaginationCustomerDto, PaginationJobDto, PaginationPaymentDto } from 'src/admin/dto/customer.dto'
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
    async getCustomerById(
        @Param('id') id: number
    ): Promise<ResponseData<{any: any}>> {
        try {
            const data = await this.customerService.getDetailCustomerById(id)
            return new ResponseData<{ any: any}>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{ any: any}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
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

    @Put('change-address/:id')
    async changeAddress(
        @Param('id') id: number,
        @Body() addressDto: AddressDto
    ): Promise<ResponseData<address>> {
        try {
            const address = await this.customerService.changeAddress(id, addressDto)
            return new ResponseData<address>(address, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<address>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    } 

    @Get('/:id/booking')
    async getCustomerJobs(
        @Param('id') id: number,
        @Query() paginationDto: PaginationJobDto
    ) {
        try {
            const job = await this.customerService.getCustomerBooking(id, paginationDto)

            return new ResponseData<{any, totalPages: number, page: number}>(job, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<any>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('/:id/payment')
    async getCustomerPayment(
        @Param('id') id: number,
        @Query() paginationDto: PaginationPaymentDto
    ) {
        try {
            const payment = await this.customerService.getCustomerPayment(id, paginationDto)
            return new ResponseData<{any, totalPages: number, page: number}>(payment, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<any>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }
}