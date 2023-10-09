import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common'
import { JobService } from './job.service'
import { ResponseData } from 'src/admin/global/globalClass'
import { job } from '@prisma/client'
import { HttpMessage, HttpStatus } from 'src/admin/global/globalEnum'
import { JobDtailGeneralInformation, JobDto } from 'src/admin/dto/job.dto'


@Controller('job')
export class JobController {

    constructor(private jobService: JobService){}

    @Get()
    async getJobs() : Promise<ResponseData<JobDto[]>> {
        try {
            const jobs = await this.jobService.getJobs()
            return new ResponseData<JobDto[]>(jobs, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<JobDto[]>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get('/:id')
    async detailJobs(@Param('id') id: number): Promise<ResponseData<string>>{
        try {
            const jobDetail = await this.jobService.detailJob(id)
            return new ResponseData<string>(null, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<string>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }


}