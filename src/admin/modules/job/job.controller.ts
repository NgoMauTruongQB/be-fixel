import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common'
import { JobService } from './job.service'
import { ResponseData } from 'src/admin/global/globalClass'
import { job } from '@prisma/client'
import { HttpMessage, HttpStatus } from 'src/admin/global/globalEnum'
import { JobDtailGeneralInformationDto, JobViewDto, ActionUserDto, JobDto } from 'src/admin/dto/job.dto'
import { PaginationJobDto } from 'src/admin/dto/paginationJob.dto'


@Controller('/api/job')
export class JobController {

    constructor(private jobService: JobService){}

    @Get()
    async getJobs(
        @Query() paginationDto: PaginationJobDto
    ): Promise<ResponseData<{ jobs: JobViewDto[], totalPages: number, page: number }>> {
        try {
            const data = await this.jobService.getJobs(paginationDto)
            return new ResponseData<{ jobs: JobViewDto[], totalPages: number, page: number }>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{ jobs: JobViewDto[], totalPages: number, page: number }>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }  
    
    @Get('all-information/:id')
    async getAllInformationJobById(
        @Param('id') id: number,
    ): Promise<ResponseData<{ any: any }>> {
        try {
            const data = await this.jobService.getAllInformationJobById(id)
            return new ResponseData<{ any: any, totalPages: number, page: number }>(data, HttpStatus.ERROR, HttpMessage.ERROR)
        } catch (error) {
            return new ResponseData<{ any: any, totalPages: number, page: number }>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('pending-jobs')
    async getPendingJobs(
        @Query() paginationDto: PaginationJobDto
    ): Promise<ResponseData<{ jobs: JobViewDto[], totalPages: number, page: number }>> {
        try {
            const data = await this.jobService.getPendingJobs(paginationDto)
            return new ResponseData<{ jobs: JobViewDto[], totalPages: number, page: number }>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{ jobs: JobViewDto[], totalPages: number, page: number }>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('offers-by-job/:id')
    async getOffersByJob(
        @Param('id') id: number,
        @Query() paginationDto: PaginationJobDto
    ): Promise<ResponseData<{ any: any, totalPages: number, page: number }>> {
        try {
            const data = await this.jobService.getOffersByJob(paginationDto, id)
            return new ResponseData<{ any: any, totalPages: number, page: number }>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{ any: any, totalPages: number, page: number }>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('payments-by-job/:id')
    async getPaymentsByJob(
        @Param('id') id: number,
        @Query() paginationDto: PaginationJobDto
    ): Promise<ResponseData<{ any: any, totalPages: number, page: number }>> {
        try {
            const data = await this.jobService.getPaymentsByJob(paginationDto, id)
            return new ResponseData<{ any: any, totalPages: number, page: number }>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{ any: any, totalPages: number, page: number }>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Post()
    async createJob( @Body() jobDto: JobDto ): Promise<ResponseData<JobDto>> {
        try {
            const job = await this.jobService.createJob(jobDto)
            return new ResponseData<JobDto>(job, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            console.log('ERROR: ',error)
            return new ResponseData<JobDto>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }
    
    @Put('soft-delete/:id')
    async softDeleteJob(
        @Param('id') id: number, 
        @Body() actionUser : ActionUserDto
    ): Promise<ResponseData<boolean>> {
        try {
            const isDelete = await this.jobService.softDeleteJob(id, actionUser)
            return new ResponseData<boolean>(isDelete, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<boolean>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Put('restore/:id')
    async restoreJob(
        @Param('id') id: number,
        @Body() actionUser: ActionUserDto
    ): Promise<ResponseData<boolean>> {
        try {
            const isRestore = await this.jobService.restoreJob(id, actionUser)
            return new ResponseData<boolean>(isRestore, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<boolean>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Put('cancel-job/:id')
    async cancelJob(
        @Param('id') id: number,
        @Body() actionUser: ActionUserDto
    ): Promise<ResponseData<boolean>> {
        try {
            const isCancel = await this.jobService.cancelJob(id, actionUser)
            return new ResponseData<boolean>(isCancel, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<boolean>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('general-information/:id')
    async getDetailGeneralInformation(@Param('id') id: number): Promise<ResponseData<JobDtailGeneralInformationDto>>{
        try {
            const jobDetail = await this.jobService.getDetailGeneralInformation(id)
            return new ResponseData<JobDtailGeneralInformationDto>(jobDetail, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<JobDtailGeneralInformationDto>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Put('general-information/:id')
    async updateProduct(
        @Body() jobDtailGeneralInformationDto: JobDtailGeneralInformationDto,
        @Param('id') id: number
    ): Promise<ResponseData<job>> {
        try {
            const jobDetail = await this.jobService.updateGeneraInformation(id, jobDtailGeneralInformationDto)
            return new ResponseData<job>(jobDetail, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<job>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
    
}