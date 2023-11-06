import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ActionUserDto, AddressDto, GeneralInformationDto, PaginationCustomerDto, PaginationDto, PaginationPaymentDto, ReviewDto } from 'src/admin/dto/customer.dto'
import { CustomerDto } from 'src/admin/dto/customer.dto'
import { throwError } from 'rxjs'
import { convertToTimeZone } from 'src/shared/timezone.utility'

@Injectable({})
export class CustomerService {
    constructor(private prisma: PrismaService){}

    async getCustomers(paginationDto: PaginationCustomerDto): Promise<{ customers: CustomerDto[], totalPages: number, page: number }> {
        const { page = 1, limit = 9, username, email, status, startDate, endDate } = paginationDto
        const skip = (page - 1) * limit
    
        try {
            const filterConditions: Record<string, any> = {
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
                filterConditions.activate_time = {
                    gte: startDate,
                    lte: endDate,
                }
            }

    
            const [customers, totalCount] = await Promise.all([
                this.prisma.customer.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        user_name: true,
                        name: true,
                        email: true,
                        status: true,
                        insert_time: true,
                        activate_time: true,
                        avatar: true,
                        delete_time: true
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.customer.count({
                    where: {
                        ...filterConditions,
                    },
                }),
            ])
    
            const totalPages = Math.ceil(totalCount / limit)
    
            return { customers, totalPages, page }
        } catch (error) {
            throw error
        }
    }

    async getGeneralInformation(id: number): Promise<any> {
        try {
            const customer = await this.prisma.customer.findUnique({
                where: {
                    delete_time: null,
                    id,
                },
                select: {
                    id: true,
                    status: true,
                    avatar: true,
                    user_name: true,
                    email: true,
                    name: true,
                    mobile_number: true,
                    activate_time: true,
                    review: true               
                }
            })

            if (customer) {
                const payments = await this.prisma.payment.findMany({
                    where: { id },
                    select: { amount: true }
                })
    
                const totalAmount = payments.reduce((total, payment) => total + payment.amount, 0)
    
                const data = {
                    ...customer,
                    totalAmount
                }
    
                return data
            } else {
                return null
            }
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
                customer_id: id,
            }

            const jobs = await this.prisma.job.findMany({
                where: filterConditions,
                select: {
                    id: true,
                    code: true,
                    status: true,
                    handyman_job_handyman_idTohandyman: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
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
                    payment_status: true,
                    payment: {
                        select: {
                            penalty: true,
                            refunded_amount: true,
                        },
                    },
                    update_time: true,
                },
                skip: Number(skip),
                take: Number(limit),
            })

            const jobsWithTotals = jobs.map((job) => {
                const totalRefundedAmount = job.payment.reduce(
                    (total, payment) => total + (payment.refunded_amount || 0),
                    0
                )
                const totalPenalty = job.payment.reduce(
                    (total, payment) => total + (payment.penalty || 0),
                    0
                )
                const { payment, ...jobWithoutPayment } = job
                return {
                    ...jobWithoutPayment,
                    totalRefundedAmount,
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
                        customer_id: id
                    },
                    select: {
                        job_id: true,
                        job_code: true,
                        star_for_handyman: true,
                        content_for_handyman: true
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.review.count({
                    where: {
                        delete_time: null,
                        customer_id: id
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
                customer_id: id
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

    async getAddress(id: number, paginationDto: PaginationDto): Promise<any> {
        const { page = 1, limit = 9 } = paginationDto
        const skip = (page - 1) * limit

        try {

            const filterConditions: Record<string, any> = {
                delete_time: null,
                customer_id: id
            }
        
            const [address, totalCount] = await Promise.all([
                this.prisma.address.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        floor: true,
                        unit_no: true,
                        building: true,
                        home: true,
                        street: true,
                        country: true,
                        post_code: true,
                        default: true
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.address.count({
                    where: {
                        ...filterConditions
                    },
                }),
            ])

            const totalPages = Math.ceil(totalCount / limit)

            return { address, totalPages, page }
        } catch (error) {
            throw error
        }
    }

    async forceLogoutUser(id: number): Promise<boolean> {
        try {
            const data = await this.prisma.customer.update({
                where: { id },
                data: {
                    device_token: null,
                    googleToken: null
                }
            })
            if(data) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw error
        }
    }

    async softDeleteCustomer(id: number, actionUser: ActionUserDto): Promise<boolean> {
        try {
            const data = await this.prisma.customer.update({
                where: { id },
                data: {
                    delete_time: convertToTimeZone(new Date, process.env.TIMEZONE_OFFSET),
                    delete_by: actionUser.user_id
                }
            })

            if(!data) {
                return false
            }

            return true
        } catch (error) {
            throw error
        }
    }

    async restoreCustomer(id: number, actionUser: ActionUserDto): Promise<boolean> {
        try {
            const data = await this.prisma.customer.update({
                where: { id },
                data: {
                    delete_time: null,
                    delete_by: null,
                    update_by: actionUser.user_id,
                    update_time: convertToTimeZone(new Date, process.env.TIMEZONE_OFFSET)
                },
            })

            if(!data) {
                return false
            }

            return true
        } catch (error) {
            throw error
        }
    }

    async updateGeneralInformation(id: number, paginationDto: GeneralInformationDto): Promise<boolean> {
        try {
            const usernameExists = await this.isUsernameExistsForOtherCustomers(paginationDto.user_name, id)

            if (usernameExists && !paginationDto.is_delete_avatar) {
                throw new Error('Username already exists.')
            }

            var data = await this.prisma.customer.update({
                where: {
                    id: id,
                },
                data: {
                    name: paginationDto.name,
                    user_name: paginationDto.user_name,
                    mobile_number: paginationDto.mobile,
                    avatar: paginationDto.is_delete_avatar ? '' : undefined,
                    update_time: convertToTimeZone(new Date, process.env.TIMEZONE_OFFSET),
                    update_by: paginationDto.actionUser
                },
            })

            return data ? true : false
        } catch (error) {
            throw error
        }
    }

    async isUsernameExistsForOtherCustomers(username: string, currentCustomerId: number): Promise<boolean> {
        const existingUser = await this.prisma.customer.findFirst({
            where: {
                user_name: username,
                NOT: {
                    id: currentCustomerId,
                },
            },
        })

        return !!existingUser
    }

    async deactivateCustomer(id: number, actionUser: ActionUserDto): Promise<boolean> {
        try {
            const data = await this.prisma.customer.update({
                where: { id },
                data: {
                    update_by: actionUser.user_id,
                    update_time: convertToTimeZone(new Date, process.env.TIMEZONE_OFFSET),
                    status: 3
                }
            })

            if(!data) {
                return false
            }
            return true
        } catch (error) {
            throw error
        }
    }

    async activateCustomer(id: number, actionUser: ActionUserDto): Promise<boolean> {
        try {
            const data = await this.prisma.customer.update({
                where: { id },
                data: {
                    update_by: actionUser.user_id,
                    update_time: convertToTimeZone(new Date, process.env.TIMEZONE_OFFSET),
                    status: 2
                }
            })

            if(!data) {
                return false
            }
            return true
        } catch (error) {
            throw error
        }
    }
      
}