import { Module } from '@nestjs/common'
import { CSVController } from './csv.controller'
import { CSVService } from './csv.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
    controllers: [
        CSVController
    ],
    providers: [
        CSVService,
        PrismaService
    ]
})

export class CSVModule{}