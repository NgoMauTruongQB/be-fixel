import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { PaginationFixelistDto } from 'src/admin/dto/fixelist.dto'

@Injectable({})
export class FixelistService {

    constructor(private prisma: PrismaService){}

    async getFixelist(paginationDto: PaginationFixelistDto): Promise<any>{
        const { page = 1, limit = 9, email, username, service } = paginationDto
        const skip = (page - 1) * limit

        console.log(service)

        try {
            const filterConditions: Record<string, any> = {
                delete_time: null,
            }
        
            if (username) {
                filterConditions.user_name = username;
            }
        
            if (email) {
                filterConditions.email = email;
            }
        
            if (service) {
                filterConditions.services = {
                    hasSome: [service]
                }
            }

            console.log(filterConditions)

            const [fixelist, totalCount] = await Promise.all([
                this.prisma.handyman.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        uuid: true,
                        email: true,
                        user_name: true,
                        status: true,
                        mobile_number: true,
                        position: true,
                        avatar: true,
                        name: true,
                        services: true,
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.job.count({
                    where: {
                        delete_time: null,
                    },
                }),
            ])

            const totalPages = Math.ceil(totalCount / limit)

            return { fixelist, totalPages, page }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}