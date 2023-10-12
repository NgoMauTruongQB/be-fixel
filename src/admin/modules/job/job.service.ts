import { Injectable } from '@nestjs/common'
import { job } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { JobDtailGeneralInformationDto, JobViewDto, ActionUserDto, JobDto } from 'src/admin/dto/job.dto'
import { convertToTimeZone } from 'src/shared/timezone.utility'
import { generateSixDigitCode } from 'src/shared/uniqueDigitsCode'
import { PaginationDto } from 'src/admin/dto/pagination.dto'

@Injectable({})
export class JobService {

    constructor(private prisma: PrismaService) { }

    async getJobs(paginationDto: PaginationDto): Promise<JobViewDto[]> {

        const { page = 1, limit = 10 } = paginationDto
        const skip = (page - 1) * limit

        try {
            const jobs = await this.prisma.job.findMany({
                where: {
                    delete_time: null,
                    delete_by: null
                },
                select: {
                    id: true,
                    code: true,
                    status: true,
                    insert_time: true,
                    complete_time: true,
                    schedule_time: true,
                    customer: {
                        select: {
                            id: true,
                            user_name: true,
                        }
                    },
                    handyman_job_handyman_idTohandyman: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    handyman_job_worker_idTohandyman: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                },
                skip: Number(skip),
                take: Number(limit),
            })
            return jobs
        } catch (error) {
            throw error
        }
    }

    async getDetailGeneralInformation(id: number): Promise<JobDtailGeneralInformationDto> {
        try {
            const job = await this.prisma.job.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    id: true,
                    code: true,
                    is_urgent: true,
                    insert_time: true,
                    schedule_time: true,
                    complete_time: true,
                    gst_amount: true,
                    paid_amount: true,
                    service: {
                        select: { name: true }
                    },
                    customer: {
                        select: {
                            id: true,
                            user_name: true,
                        }
                    },
                    handyman_job_handyman_idTohandyman: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    handyman_job_worker_idTohandyman: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    address: {
                        select: {
                            floor: true,
                            blk_no: true,
                            unit_no: true,
                            building: true,
                            street: true,
                            country: true,
                            post_code: true
                        }
                    }
                }
            })

            return job
        } catch (error) {
            throw error
        }
    }

    async updateGeneraInformation(id: number, jobGenerateInformationDto: JobDtailGeneralInformationDto): Promise<job> {
        try {
            const {
                is_urgent,
                insert_time,
                schedule_time,
                complete_time,
                paid_amount,
                gst_amount,
            } = jobGenerateInformationDto

            const updatedJob = await this.prisma.job.update({
                where: {
                    id: Number(id)
                },
                data: {
                    is_urgent,
                    insert_time,
                    schedule_time,
                    complete_time,
                    paid_amount,
                    gst_amount
                }
            })
            return updatedJob
        } catch (error) {
            throw error
        }
    }


    async softDeleteJob(id: number, actionUser: ActionUserDto): Promise<boolean> {
        try {
            const data = await this.prisma.job.update({
                where: { id },
                data: {
                    delete_time: convertToTimeZone(new Date, process.env.TIMEZONE_OFFSET),
                    delete_by: actionUser.user_id
                }
            })
            return true
        } catch (error) {
            throw error
        }
    }
    

    async restoreJob(id: number, actionUser: ActionUserDto): Promise<boolean> {
        try {
            await this.prisma.job.update({
                where: { id },
                data: {
                    delete_time: null,
                    delete_by: null,
                    update_by: actionUser.user_id,
                    update_time: convertToTimeZone(new Date, process.env.TIMEZONE_OFFSET)
                },
            })
            return true
        } catch (error) {
            throw error
        }
    }

    async createJob(jobDto: JobDto): Promise<job> {
        try {
            const { customer_id, service_id, address_id, ...restJobDto } = jobDto

            const service = await this.prisma.service.findUnique({
                where: { id: service_id },
                select: { code: true }
            })

            if (!service) {
                throw new Error('Service not found.')
            }

            const sixDigitCode = generateSixDigitCode()
            const code = `${service.code}#${sixDigitCode}`

            const data: any = {
                ...restJobDto,
                code,
                customer: { connect: { id: customer_id }},
                service: { connect: { id: service_id }},
                address: { connect: { id: address_id }},
            }

            const job = await this.prisma.job.create({
                data,
            })

            return job
        } catch (error) {
            throw error
        }
    }
}