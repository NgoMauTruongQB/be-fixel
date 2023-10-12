import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common'
import { JobService } from './job.service'
import { ResponseData } from 'src/admin/global/globalClass'
import { job } from '@prisma/client'
import { HttpMessage, HttpStatus } from 'src/admin/global/globalEnum'
import { JobDtailGeneralInformationDto, JobViewDto, ActionUserDto, JobDto } from 'src/admin/dto/job.dto'
import { PaginationDto } from 'src/admin/dto/pagination.dto'


@Controller('/api/job')
export class JobController {

    constructor(private jobService: JobService){}

    @Get()
    async getJobs(@Query() paginationDto: PaginationDto): Promise<ResponseData<JobViewDto[]>> {
        try {
            const jobs = await this.jobService.getJobs(paginationDto)
            return new ResponseData<JobViewDto[]>(jobs, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<JobViewDto[]>(null, HttpStatus.ERROR, HttpMessage.ERROR)
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