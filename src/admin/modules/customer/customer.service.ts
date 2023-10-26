import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { PaginationCustomerDto } from 'src/admin/dto/customer.dto'
import { CustomerDto } from 'src/admin/dto/customer.dto'

@Injectable({})
export class CustomerService {
    constructor(private prisma: PrismaService){}

    async getCustomers(paginationDto: PaginationCustomerDto): Promise<{ customers: CustomerDto[], totalPages: number, page: number }> {
        const { page = 1, limit = 9, username, email, mobile_number} = paginationDto
        const skip = (page - 1) * limit

        try {
            const filterConditions: Record<string, any> = {
                delete_time: null,
            }
        
            if (username) {
                filterConditions.user_name = username;
            }
        
            if (email) {
                filterConditions.email = email;
            }
        
            if (mobile_number) {
                filterConditions.mobile_number = mobile_number;
            }
  
            const [customers, totalCount] = await Promise.all([
                this.prisma.customer.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        uuid: true,
                        email: true,
                        user_name: true,
                        mobile_number: true,
                        avatar: true,
                        name: true,
                        status: true,
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

            return { customers, totalPages, page }
        } catch (error) {
            throw error
        }
    }

    async getDetailCustomerById(id: number): Promise<any> {
        try {
            const customer = this.prisma.customer.findUnique({
                where: {
                    delete_time: null,
                    id,
                },
                select: {
                    id: true,
                    uuid: true,
                    email: true,
                    user_name: true,
                    first_name: true,
                    last_name: true,
                    mobile_number: true,
                    home_number: true,
                    status: true,
                    activate_time: true,
                    avatar: true,
                    star: true,
                    star_count: true,
                    reward_point: true,
                    name: true,
                    address: {
                        select: {
                            default: true,
                            blk_no: true,
                            unit_no: true,
                            building: true,
                            street: true,
                            country: true,
                            post_code: true,
                            home: true
                        }
                    },
                    job: {
                        where: {
                            delete_time: null
                        },
                        select: {
                            code: true,
                            service_id: true,
                            status: true,
                            is_urgent: true,
                            insert_time: true,
                            can_cancel: true,
                            complete_time: true
                        }
                    }
                }
            })

            return customer
            
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

    
}