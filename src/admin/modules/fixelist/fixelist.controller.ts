import { Controller, Get, Param, Query } from '@nestjs/common'
import { FixelistService } from './fixelist.service';
import { PaginationDto, PaginationFixelistDto, ReviewDto } from 'src/admin/dto/fixelist.dto';
import { ResponseData } from 'src/admin/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/admin/global/globalEnum';
import { job } from '@prisma/client';

@Controller('/api/fixelist')
export class FixelistController {

    constructor(private fixelistService: FixelistService){}

    @Get()
    async getFixelist(
        @Query() paginationDto: PaginationFixelistDto
    ): Promise<ResponseData<{any: any, totalPages: number, page: number}>> {
        try {
            const data = await this.fixelistService.getFixelist(paginationDto)
            return new ResponseData<{any: any, totalPages: number, page: number}>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{any: any, totalPages: number, page: number}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('/:id')
    async getGeneralInformation(
        @Param('id') id: number
    ): Promise<ResponseData<{any: any}>> {
        try {
            const data = await this.fixelistService.getGeneralInformation(id)
            return new ResponseData<{any: any, totalPages: number, page: number}>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{any: any, totalPages: number, page: number}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('/:id/job')
    async getJobs(
        @Param('id') id: number,
        @Query() paginationDto: PaginationDto
    ): Promise<ResponseData<{ any: any, totalPages: number, page: number}>> {
        try {
            const job = await this.fixelistService.getJob(id, paginationDto)

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
            const reviews = await this.fixelistService.getReviews(id, paginationDto)
            return new ResponseData<{reviews: ReviewDto[], totalPages: number, page: number}>(reviews, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<any>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('/:id/payment')
    async getCustomerPayment(
        @Param('id') id: number,
        @Query() paginationDto: PaginationDto
    ) {
        try {
            const payment = await this.fixelistService.getPayment(id, paginationDto)
            return new ResponseData<{any, totalPages: number, page: number}>(payment, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<any>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('/:id/workers')
    async getWorkers(
        @Param('id') id: number,
        @Query() paginationDto: PaginationDto
    ) {
        try {
            const payment = await this.fixelistService.getWorkers(id, paginationDto)
            return new ResponseData<{any, totalPages: number, page: number}>(payment, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<any>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }
}