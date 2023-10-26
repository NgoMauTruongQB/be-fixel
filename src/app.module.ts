import { Module } from '@nestjs/common'
import { JobModule } from './admin/modules/job/job.module'
import { CustomerModule } from './admin/modules/customer/customer.module'
import { FixelistModule } from './admin/modules/fixelist/fixelist.module'

@Module({
    imports: [
        JobModule,
        CustomerModule,
        FixelistModule
    ],
})
export class AppModule {}
