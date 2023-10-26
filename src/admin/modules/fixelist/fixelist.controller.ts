import { Controller, Get, Query } from '@nestjs/common'
import { FixelistService } from './fixelist.service';
import { PaginationFixelistDto } from 'src/admin/dto/fixelist.dto';
import { ResponseData } from 'src/admin/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/admin/global/globalEnum';

@Controller('/api/fixelist')
export class FixelistController {

    constructor(private fixelistService: FixelistService){}

    @Get()
    async getFixelist(
        @Query() paginationDto: PaginationFixelistDto
    ): Promise<ResponseData<{any: any, totalPages: number, page: number}>> {
        try {
            const data = await this.fixelistService.getFixelist(paginationDto)
            return new ResponseData<{any: any, totalPages: number, page: number}>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{any: any, totalPages: number, page: number}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }
}