import { Controller, Get, Post } from '@nestjs/common'
import { JobService } from './job.service'

@Controller('job')
export class JobController {

    constructor(private jobService: JobService){}

    @Get()
    getJobs() {
        return this.jobService.getJobs()
    }

    // async getJobs(): Promise<any> {
    //     try {
    //       const jobs = await this.jobService.getJobs();
    //       return { success: true, data: jobs };
    //     } catch (error) {
    //       return { success: false, error: error.message };
    //     }
    //   }


}