import { Controller, Get, Res } from '@nestjs/common'
import { CSVService } from './csv.service'
import { Response } from 'express'
import * as fs from 'fs'
import { getCurrentDateTimeString } from 'src/shared/getCurrentDateTimeString'
import * as path from 'path'

@Controller('/api/csv')
export class CSVController {
    constructor(private csvService: CSVService) {}

    @Get('export')
    async exportCustomerToCsv(@Res() res: Response) {
        const excelDirectory = 'excel/customer'

        if (!fs.existsSync(excelDirectory)) {
            fs.mkdirSync(excelDirectory, { recursive: true })
        }

        const filename = path.join(excelDirectory, `EXPORT_CUSTOMER.csv`)

        await this.csvService.writeCustomserCsvFile(filename)

        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`)

        const fileStream = fs.createReadStream(filename)

        return new Promise<void>((resolve, reject) => {
            fileStream.pipe(res);
            fileStream.on('end', () => {
                resolve()
            })
            fileStream.on('error', (error) => {
                console.log(error)
                reject(error)
            })
        })
    }
}
