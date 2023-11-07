// CSVController.ts
import { Controller, Get, Res } from '@nestjs/common';
import { CSVService } from './csv.service';
import { Response } from 'express';

@Controller('/api/csv')
export class CSVController {
    constructor(private csvService: CSVService) {}

    @Get('export_customer')
    async exportCustomerToCsv(@Res() res: Response) {
        const customers = await this.csvService.getCustomersData();

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=EXPORT_CUSTOMER.csv');

        res.flushHeaders();

        // Chuyển dữ liệu thành chuỗi CSV và ghi trực tiếp vào luồng HTTP
        const header = 'ID,User Name,Name,Email,Contact,Address,Total Address,Status,Activate Time,Review(s),Jobs Posted,Jobs Completed,Jobs Cancelled\n'
        const csvData = customers.map((customer) => Object.values(customer).join(',')).join('\n');
        const csvContent = header + csvData;

        res.write(csvContent, 'utf-8');
        res.end();
    }
}
