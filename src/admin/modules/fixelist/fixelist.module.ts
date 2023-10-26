import { Module } from '@nestjs/common'
import { FixelistController } from './fixelist.controller'
import { FixelistService } from './fixelist.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
    controllers: [
        FixelistController
    ],
    providers: [
        FixelistService,
        PrismaService
    ]
})

export class FixelistModule{}