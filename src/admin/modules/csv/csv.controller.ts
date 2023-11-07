import { Controller, Get, Res } from '@nestjs/common'
import { CSVService } from './csv.service'
import { Response } from 'express'

@Controller('/api/csv')
export class CSVController {
    constructor(private csvService: CSVService) {}

    @Get('export_customer')
    async exportCustomerToCsv(@Res() res: Response) {
        const customers = await this.csvService.getCustomersData()

        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment filename=EXPORT_CUSTOMER.csv')

        res.flushHeaders()

        const header = 'ID,User Name,Name,Email,Contact,Address,Total Address,Status,Activate Time,Review(s),Jobs Posted,Jobs Completed,Jobs Cancelled\n'
        const csvData = customers.map((customer) => Object.values(customer).join(',')).join('\n')
        const csvContent = header + csvData

        res.write(csvContent, 'utf-8')
        res.end()
    }

    @Get('export_fixelist')
    async exportFixelistToCsv(@Res() res: Response) {
        const handymans = await this.csvService.getFixelistData()

        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment filename=EXPORT_FIXELIST.csv')

        res.flushHeaders()

        const header = 'Company Name,Username,Email,Contact,Default Address,Role,Status,Activated Date & Time,Review(s),Jobs Posted,Jobs Completed,Jobs Cancelled\n'
        const csvData = handymans.map((fixelist) => Object.values(fixelist).join(',')).join('\n')
        const csvContent = header + csvData

        res.write(csvContent, 'utf-8')
        res.end()
    }

    @Get('export_jobs')
    async exportJobToCsv(@Res() res: Response) {
        const jobs = await this.csvService.getJobsData()

        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment filename=EXPORT_JOB.csv')

        res.flushHeaders()

        const header = 'Job ID,Customer,Customer Email,Customer Contact,Job Address,Posted Date & Time,Scheduled Date & Time, Job Status,Fixelist,Worker,Review(s)\n'
        const csvData = jobs.map((job) => Object.values(job).join(',')).join('\n')
        const csvContent = header + csvData

        res.write(csvContent, 'utf-8')
        res.end()
    }
}
