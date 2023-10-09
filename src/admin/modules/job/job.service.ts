import { Injectable } from '@nestjs/common'
import { job } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { error } from 'console'
import { JobDtailGeneralInformation, JobDto } from 'src/admin/dto/job.dto'

@Injectable({})
export class JobService {

    constructor(private prisma: PrismaService) {}

    async getJobs(): Promise<JobDto[]> {
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
                    new_schedule_time: true,
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
                }
            })
            return jobs
        } catch (error) {
            throw error
        }
    }

    // async detailJob(id: number): Promise<JobGenerateInformationI> {
    //     try {
    //         const jobDetail: JobGenerateInformationI = await this.prisma.$queryRaw`
            //     SELECT DISTINCT
            //         job.id,
            //         job.code,
            //         service.name,
            //         job.is_urgent AS priority,
            //         job.insert_time,
            //         job.new_schedule_time AS scheduled_time,
            //         customer.user_name AS customer,
            //         handyman.name AS fixellist,
            //         handyman.name AS worker,
            //         SUM(CASE WHEN payment.status = 'completed' THEN payment.amount ELSE 0 END) AS total_paid_amount,
            //         SUM(payment.fee + payment.fee_vat + payment.interest_vat) AS gst,
            //         address.floor,
            //         address.blk_no,
            //         address.unit_no,
            //         address.building,
            //         address.street,
            //         address.country,
            //         address.post_code
            //     FROM job
            //     LEFT JOIN service ON job.service_id = service.id
            //     LEFT JOIN customer ON job.customer_id = customer.id
            //     LEFT JOIN handyman ON job.handyman_id = handyman.id
            //     LEFT JOIN payment ON job.code = payment.job_code
            //     LEFT JOIN address ON customer.id = address.customer_id
            //     WHERE job.id = ${Number(2)}
            //     GROUP BY job.id, job.code, service.name, job.is_urgent, job.insert_time, job.new_schedule_time, customer.user_name, handyman.name, address.floor, address.blk_no, address.unit_no, address.building, address.street, address.country, address.post_code
            // `
    //         console.log('TEST')
    //         console.log(jobDetail)
    //         return jobDetail[0]
    //     } catch (error) {
    //         throw error
    //     }
    // } 

    async detailJob(id: number): Promise<JobDtailGeneralInformation> {
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
                    new_schedule_time: true,
                    complete_time: true,
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
                    },
                    payment: {
                        select: {
                            amount: true
                        }
                    }       
                }
            })
            if (!job) {
                throw new Error(`Job with id ${id} not found`);
            }
          
            const totalPaidAmount = job.payment.reduce((acc, payment) => acc + (payment.amount || 0), 0);
          
            console.log( {
                ...job,
                total_paid_amount: totalPaidAmount
            })
            
            return 
        } catch (error) {
            throw error
        }
    }

}