import { Injectable } from '@nestjs/common'
import { job } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable({})
export class JobService {

    constructor(private prisma: PrismaService) {}


    async getJobs(): Promise<job[]> {
        return this.prisma.job.findMany()
    }

}