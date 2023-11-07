import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { format } from 'date-fns'

@Injectable()
export class CSVService {
    constructor(private prisma: PrismaService) {}

    async getCustomersData() {
        const filterConditions: Record<string, any> = {
            delete_time: null
        }

        const customers = await this.prisma.customer.findMany({
            where: filterConditions,
            select: {
                id: true,
                user_name: true,
                name: true,
                email: true,
                mobile_number: true,
                address: {
                    where: {
                        default: true
                    },
                    select: {
                        floor: true,
                        unit_no: true,
                        building: true,
                        home: true,
                        street: true,
                        country: true,
                        post_code: true,
                    }
                },
                status: true,
                activate_time: true,
                review: true,
                job: {
                    select: {
                        status: true
                    }
                },
            },
        })

        const data = customers.map((customer: any) => {
            const formattedActivateTime = format(new Date(customer.activate_time), 'yyyy-MM-dd HH:mm:ss')
            const addressData = customer.address[0] || {}
            const floor = addressData.floor || ''
            const unit_no = addressData.unit_no || ''
            const building = addressData.building || ''
            const home = addressData.home || ''
            const street = addressData.street || ''
            const country = addressData.country || ''
            const post_code = addressData.post_code || ''
            const address = `"${[floor, unit_no, building, home, street, country, post_code].filter(Boolean).join(', ')}"`;            
            const total_address = customer.address.length
            const status = (customer.status == 2) ? 'ACTIVATED' : ((customer.status == 1) ? 'NEW' : '')
            const review = customer.review.length
            const jobs_posted = customer.job.length
            let jobs_completed = 0
            let jobs_cancelled = 0

            customer.job.forEach((job) => {
                if (job.status === 4) {
                    jobs_completed++
                }
                if (job.status === 5) {
                    jobs_cancelled++
                }
            })

            return {
                id: customer.id,
                user_name: customer.user_name,
                name: customer.name,
                email: customer.email,
                mobile_number: customer.mobile_number,
                address,
                total_address,
                status,
                activate_time: formattedActivateTime,
                review,
                jobs_posted,
                jobs_completed,
                jobs_cancelled,
            }
        })

        return data
    }
}
