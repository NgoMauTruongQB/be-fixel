import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { PaginationDto, PaginationFixelistDto, ReviewDto } from 'src/admin/dto/fixelist.dto'
import { job } from '@prisma/client'
import { SlowBuffer } from 'buffer'

@Injectable({})
export class FixelistService {

    constructor(private prisma: PrismaService){}

    async getFixelist(paginationDto: PaginationFixelistDto): Promise<any>{
        const { page = 1, limit = 9, email, username, status, startDate, endDate  } = paginationDto
        const skip = (page - 1) * limit


        try {
            const filterConditions: Record<string, any> = {
                delete_time: null,
            }
        
            if (username) {
                filterConditions.user_name = username
            }
        
            if (email) {
                filterConditions.email = email
            }
        
            if (status) {
                filterConditions.status = status
            }

            if (startDate && endDate) {
                filterConditions.insert_time = {
                    gte: startDate,
                    lte: endDate,
                }
            }

            const [fixelist, totalCount] = await Promise.all([
                this.prisma.handyman.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        user_name: true,
                        name: true,
                        email: true,
                        role: true,
                        status: true,
                        insert_time: true,
                        approve_time: true
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.handyman.count({
                    where: {
                        ...filterConditions
                    },
                }),
            ])

            const totalPages = Math.ceil(totalCount / limit)

            return { fixelist, totalPages, page }
        } catch (error) {
            throw error
        }
    }

    async getGeneralInformation(id: number): Promise<any> {
        try {
            const handyman = await this.prisma.handyman.findUnique({
                where: {
                    delete_time: null,
                    id,
                },
                select: {
                    id: true,
                    status: true,
                    role: true,
                    avatar: true,
                    user_name: true,
                    email: true,
                    review: true,
                    name: true,
                    mobile_number: true,
                    approve_time: true,
                    services: true,
                    address: true,
                    gst: true,
                    uen: true,
                    recipient: {
                        where: { delete_time: null },
                        select: {
                            bank_name: true,
                            bank_number: true,
                            bank_brand: true,
                            insert_time: true,
                        }
                    }
                }
            })

            return handyman
        } catch (error) {
            throw error
        }
    }

    async getJob(id: number, paginationDto: PaginationDto): Promise<any> {
        const { page = 1, limit = 9 } = paginationDto
        const skip = (page - 1) * limit

        try {
            const filterConditions: Record<string, any> = {
                delete_time: null,
                handyman_id: id,
            }

            const jobs = await this.prisma.job.findMany({
                where: filterConditions,
                select: {
                    id: true,
                    code: true,
                    status: true,
                    customer: { select: { id: true, user_name: true } },
                    handyman_job_worker_idTohandyman: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    insert_time: true,
                    schedule_time: true,
                    complete_time: true,
                    paid_amount: true,
                    payment: {
                        select: {
                            penalty: true
                        }
                    },
                    payment_fixelist_time: true,
                    payment_status: true,

                },
                skip: Number(skip),
                take: Number(limit),
            })

            const jobsWithTotals = jobs.map((job) => {
                const totalPenalty = job.payment.reduce(
                    (total, payment) => total + (payment.penalty || 0),
                    0
                )
                const { payment, ...jobWithoutPayment } = job
                return {
                    ...jobWithoutPayment,
                    totalPenalty,
                }
            })

            const totalPages = Math.ceil(jobsWithTotals.length / limit)

            return { jobs: jobsWithTotals, totalPages, page }

        } catch (error) {
            throw error
        }
    }

    async getReviews(id: number, paginationDto: PaginationDto): Promise<{ reviews: ReviewDto[], totalPages: number, page: number }> {
        const { page = 1, limit = 9 } = paginationDto
        const skip = (page - 1) * limit
    
        try {
            const [reviews, totalCount] = await Promise.all([
                this.prisma.review.findMany({
                    where: {
                        delete_time: null,
                        handyman_id: id
                    },
                    select: {
                        job_id: true,
                        job_code: true,
                        star_for_customer: true,
                        content_for_customer: true
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.review.count({
                    where: {
                        delete_time: null,
                        handyman_id: id
                    },
                }),
            ])
    
            const totalPages = Math.ceil(totalCount / limit)
    
            return { reviews, totalPages, page }
        } catch (error) {
            throw error
        }
    }

    async getPayment(id: number, paginationDto: PaginationDto): Promise<any> {
        const { page = 1, limit = 9 } = paginationDto
        const skip = (page - 1) * limit

        try {

            const filterConditions: Record<string, any> = {
                delete_time: null,
                handyman_id: id
            }
        
            const [payments, totalCount] = await Promise.all([
                this.prisma.payment.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        insert_time: true,
                        charge_id: true,
                        job_code: true,
                        type: true,
                        status: true,
                        amount: true,
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.payment.count({
                    where: {
                        ...filterConditions
                    },
                }),
            ])

            const totalPages = Math.ceil(totalCount / limit)

            return { payments, totalPages, page }
        } catch (error) {
            throw error
        }
    }

    async getWorkers(id: number, paginationDto: PaginationDto): Promise<any> {
        const { page = 1, limit = 9 } = paginationDto
        const skip = (page - 1) * limit

        try {

            const filterConditions: Record<string, any> = {
                delete_time: null,
                id
            }
        
            const [payments, totalCount] = await Promise.all([
                this.prisma.handyman.findMany({
                    where: filterConditions,
                    select: {
                        other_handyman: {
                            select: {
                                user_name: true,
                                email: true,
                                mobile_number: true,
                                status: true,
                                approve_time: true
                            }
                        }
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.payment.count({
                    where: {
                        ...filterConditions
                    },
                }),
            ])

            const totalPages = Math.ceil(totalCount / limit)

            return { payments, totalPages, page }
        } catch (error) {
            throw error
        }
    }
}