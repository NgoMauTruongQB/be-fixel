import { Controller, Get, Param, Put, Query } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { ResponseData } from 'src/admin/global/globalClass'
import { PaginationCustomerDto } from 'src/admin/dto/customer.dto'
import { CustomerDto } from 'src/admin/dto/customer.dto'
import { HttpMessage, HttpStatus } from 'src/admin/global/globalEnum'

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
}