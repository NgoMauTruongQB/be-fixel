import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { format } from 'date-fns'
import { isNull } from 'util'

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
            const address = `"${[floor, unit_no, building, home, street, country, post_code].filter(Boolean).join(', ')}"`           
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

    async getFixelistData() {
        const filterConditions: Record<string, any> = {
            delete_time: null
        }

        const handymans = await this.prisma.handyman.findMany({
            where: filterConditions,
            select: {
                name: true,
                user_name: true,
                email: true,
                mobile_number: true,
                address: true,
                role: true,
                status: true,
                activate_time: true,
                review: true,
                job_job_handyman_idTohandyman: {
                    select: {
                        status: true
                    }
                },
            },
        })

        const data = handymans.map((handyman: any) => {
            const formattedActivateTime = format(new Date(handyman.activate_time), 'yyyy-MM-dd HH:mm:ss')
            const status = (handyman.status == 3) ? 'DEACTIVATED' : ((handyman.status == 2) ? 'APPROVED' : '')
            const review = handyman.review.length
            const jobs_posted = handyman.job_job_handyman_idTohandyman.length
            const address = (handyman.address) ? `"${ handyman.address}"` : ''
            let jobs_completed = 0
            let jobs_cancelled = 0

            handyman.job_job_handyman_idTohandyman.forEach((job) => {
                if (job.status === 4) {
                    jobs_completed++
                }
                if (job.status === 5) {
                    jobs_cancelled++
                }
            })

            return {
                name: handyman.name,
                user_name: handyman.user_name,
                email: handyman.email,
                mobile_number: handyman.mobile_number,
                address: address,
                role: handyman.role,
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

    async getJobsData() {
        const filterConditions: Record<string, any> = {
            delete_time: null
        }

        const jobs = await this.prisma.job.findMany({
            where: filterConditions,
            select: {
                code: true,
                customer: {
                    select: {
                        user_name: true,
                        email: true,
                        mobile_number: true,
                    }
                },
                address: {
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
                insert_time: true,
                schedule_time: true,
                status: true,
                handyman_job_handyman_idTohandyman: {
                    select: {
                        name: true
                    }
                },
                handyman_job_worker_idTohandyman: {
                    select: {
                        name: true
                    }
                },
                review: true
            },
        })

        const data = jobs.map((job: any) => {
            const formattedInsertTime = format(new Date(job.insert_time), 'yyyy-MM-dd HH:mm:ss')
            const formattedScheduleTime = format(new Date(job.schedule_time), 'yyyy-MM-dd HH:mm:ss')
            const status = (job.status == 5) ? 'CANCELED' : (job.status == 4) ? 'COMPLETED' : (job.status == 2) ? 'DISCUSSION' : ''
            const addressData = job.address || {}
            const floor = addressData.floor || ''
            const unit_no = addressData.unit_no || ''
            const building = addressData.building || ''
            const home = addressData.home || ''
            const street = addressData.street || ''
            const country = addressData.country || ''
            const post_code = addressData.post_code || ''
            const address = `"${[floor, unit_no, building, home, street, country, post_code].filter(Boolean).join(', ')}"` 
            const fixelist = job.handyman_job_handyman_idTohandyman?.name || ''
            const worker = job.handyman_job_worker_idTohandyman?.name || ''
            const review = job.review?.length || 0

            return {
                code: job.code,
                customer: job.customer.user_name,
                email: job.customer.email,
                mobile: job.customer.mobile_number,
                address,
                posted_date: formattedInsertTime,
                schedule_date: formattedScheduleTime,
                status,
                fixelist,
                worker,
                review,
            }
        })
        console.log(jobs)
        return data
    }
    
}
