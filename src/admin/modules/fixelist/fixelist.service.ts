import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { PaginationFixelistDto } from 'src/admin/dto/fixelist.dto'

@Injectable({})
export class FixelistService {

    constructor(private prisma: PrismaService){}

    async getFixelist(paginationDto: PaginationFixelistDto): Promise<any>{
        const { page = 1, limit = 9, email, username, status, startDate, endDate  } = paginationDto
        const skip = (page - 1) * limit


        try {
            const filterConditions: Record<string, any> = {
                delete_time: null,
            }
        
            if (username) {
                filterConditions.user_name = username
            }
        
            if (email) {
                filterConditions.email = email
            }
        
            if (status) {
                filterConditions.status = status
            }

            if (startDate && endDate) {
                filterConditions.insert_time = {
                    gte: startDate,
                    lte: endDate,
                }
            }

            const [fixelist, totalCount] = await Promise.all([
                this.prisma.handyman.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        user_name: true,
                        name: true,
                        email: true,
                        role: true,
                        status: true,
                        insert_time: true,
                        approve_time: true
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.handyman.count({
                    where: {
                        ...filterConditions
                    },
                }),
            ])

            const totalPages = Math.ceil(totalCount / limit)

            return { fixelist, totalPages, page }
        } catch (error) {
            throw error
        }
    }
}