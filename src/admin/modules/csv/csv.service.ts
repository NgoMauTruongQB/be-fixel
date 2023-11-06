import { ConsoleLogger, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as fs from 'fs'
import * as fastcsv from 'fast-csv'
import { resolve } from 'path'
import { format } from 'date-fns'
import { count } from 'console'

@Injectable()
export class CSVService {
    constructor(private prisma: PrismaService) {}

    async writeCustomserCsvFile(filename: string): Promise<void> {
        try {
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

            const csvStream = fs.createWriteStream(filename)
            const csvWriter = fastcsv.format()
            csvWriter.pipe(csvStream)

            csvWriter.write({
                id: 'ID',
                user_name: 'User Name',
                name: 'Name',
                email: 'Email',
                mobile_number: 'Contact',
                address: 'Address',
                total_address: 'Total Address',
                status: 'Status',
                activate_time: 'Activate Time',
                review: 'Review(s)',
                jobs_posted: 'Jobs Posted',
                jobs_completed: 'Jobs Completed',
                jobs_cancelled: 'Jobs Cancelled'
            })

            customers.forEach((customer: any) => {
                const formattedActivateTime = format(new Date(customer.activate_time), 'yyyy-MM-dd HH:mm:ss')

                const addressData = customer.address[0] || {}
                const floor = addressData.floor || ''
                const unit_no = addressData.unit_no || ''
                const building = addressData.building || ''
                const home = addressData.home || ''
                const street = addressData.street || ''
                const country = addressData.country || ''
                const post_code = addressData.post_code || ''
                const address = [floor, unit_no, building, home, street, country, post_code].filter(Boolean).join(', ')
                const total_address = customer.address.length
                const status = (customer.status == 2) ? 'ACTIVATED' : ((customer.status == 1) ? 'NEW' : '')
                const review = customer.review.length
                const jobs_posted = customer.job.length
                var jobs_completed = 0
                var jobs_cancelled = 0
                customer.job.forEach(job => {
                    if (job.status === 4) {
                        jobs_completed++
                    }
                    if (job.status === 5) {
                        jobs_cancelled++
                    }
                })

                csvWriter.write({
                    id: customer.id,
                    user_name: customer.user_name,
                    name: customer.name,
                    email: customer.email,
                    mobile_number: customer.mobile_number,
                    address: address,
                    total_address: total_address,
                    status: status,
                    activate_time: formattedActivateTime,
                    review: review,
                    jobs_posted: jobs_posted,
                    jobs_completed: jobs_completed,
                    jobs_cancelled: jobs_cancelled
                })
            })

            csvStream.on('finish', () => {
                resolve()
            })

            csvWriter.end()

        } catch (error) {
            console.error('Error in writeCsvFile: ', error)
            throw error
        }
    }
}
