import { Module } from '@nestjs/common'
import { JobModule } from './admin/modules/job/job.module'
import { CustomerModule } from './admin/modules/customer/customer.module'
import { FixelistModule } from './admin/modules/fixelist/fixelist.module'
import { CSVModule } from './admin/modules/csv/csv.module'

@Module({
    imports: [
        JobModule,
        CustomerModule,
        FixelistModule,
        CSVModule
    ],
})
export class AppModule {}
