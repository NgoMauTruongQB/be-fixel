import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ActionUserDto, AddressDto, PaginationCustomerDto, PaginationJobDto, PaginationPaymentDto } from 'src/admin/dto/customer.dto'
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
                delete_time: null,
            };
    
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
                    review: {
                        select: {
                            job_code: true,
                            job_id: true,
                            star_for_handyman: true,
                            content_for_handyman: true
                        }
                    },
                    name: true,
                    mobile_number: true,
                    activate_time: true,                  
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

    async changeAddress(id: number, addressDto: AddressDto): Promise<any> {
        try {

            const data = await this.prisma.address.update({
                where: { id },
                data: {
                    default: addressDto.is_default,
                    blk_no: addressDto.blk_no,
                    floor: addressDto.floor,
                    unit_no: addressDto.floor,
                    building: addressDto.building,
                    street: addressDto.street,
                    country: addressDto.country,
                    post_code: addressDto.post_code,
                    update_time: convertToTimeZone(new Date, process.env.TIMEZONE_OFFSET),
                    home: addressDto.is_home,
                    update_by: addressDto.update_by,
                }
            })

            if(!data) {
                return false
            }

            return true
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getCustomerBooking(id: number, paginationDto: PaginationJobDto): Promise<any> {
        const { page = 1, limit = 9, service_id, status } = paginationDto
        const skip = (page - 1) * limit

        try {

            const filterConditions: Record<string, any> = {
                delete_time: null,
                customer_id: id
            }
        
            if (service_id) {
                filterConditions.service_id = service_id
            }
        
            if (status) {
                filterConditions.status = status
            }
        
            const [jobs, totalCount] = await Promise.all([
                this.prisma.job.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        code: true,
                        status: true,
                        service_id: true,
                        insert_time: true,
                        complete_time: true,
                        schedule_time: true,
                        cancel_time: true,
                        is_urgent: true,                        
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
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.job.count({
                    where: {
                        delete_time: null,
                    },
                }),
            ])

            const totalPages = Math.ceil(totalCount / limit)

            return { jobs, totalPages, page }
        } catch (error) {
            throw error
        }
    }

    async getCustomerPayment(id: number, paginationDto: PaginationPaymentDto): Promise<any> {
        const { page = 1, limit = 9, job_code, status } = paginationDto
        const skip = (page - 1) * limit

        try {

            const filterConditions: Record<string, any> = {
                delete_time: null,
                customer_id: id
            }
        
            if (job_code) {
                filterConditions.job_code = job_code
            }
        
            if (status) {
                filterConditions.status = status
            }
        
            const [payments, totalCount] = await Promise.all([
                this.prisma.payment.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        type: true,
                        job_code: true,
                        amount: true,
                        net: true,
                        fee: true,
                        fee_vat: true,
                        interest: true,
                        interest_vat: true,
                        currency: true,
                        paid: true,
                        status: true,
                        charge_id: true,
                        ref_charge_id: true,
                        handyman: {
                            select: {
                                id: true,
                                name: true,
                                user_name: true,
                                mobile_number: true,
                            }
                        }

                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.job.count({
                    where: {
                        delete_time: null,
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