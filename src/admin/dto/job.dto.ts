import { IsArray, IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { convertToTimeZone } from 'src/shared/timezone.utility'


export class JobDto {

    @IsNumber()
    @IsNotEmpty()
    customer_id?: number

    @IsNotEmpty()
    @IsNumber()
    service_id?: number

    @IsNotEmpty()
    @IsNumber()
    address_id?: number

    @IsBoolean()
    @IsNotEmpty()
    is_urgent?: boolean = false

    @IsNumber()
    @IsOptional()
    paid_amount?: number

    @IsNumber()
    @IsOptional()
    gst_amount?: number

    @IsOptional()
    @IsString()
    image?: string[]

    @IsOptional()
    @IsString()
    video?: string[]

    @IsNotEmpty()
    @IsString()
    note?: string

    @IsNotEmpty()
    @IsNumber()
    indicative_value?: number = 1

    @IsNotEmpty()
    @IsDateString()
    expect_time?: Date = convertToTimeZone(new Date, process.env.TIMEZONE_OFFSET)

    @IsNotEmpty()
    @IsDateString()
    expire_time?: Date

    @IsOptional()
    @IsNumber()
    status?: number = 1

    @IsDateString()
    @IsOptional()
    progress_time?: Date

    @IsDateString()
    @IsOptional()
    complete_time?: Date

    @IsDateString()
    @IsOptional()
    owner_complete_time?: Date

    @IsDateString()
    @IsOptional()
    cancel_time?: Date

    @IsOptional()
    @IsNumber()
    cancel_by?: number

    @IsOptional()
    @IsBoolean()
    is_abort?: boolean = true
    
    @IsOptional()
    @IsNumber()
    complete_by?: number

    @IsOptional()
    @IsNumber()
    reason?: number

    @IsOptional()
    @IsNumber()
    count_reschedule?: number = 0

    @IsOptional()
    @IsNumber()
    hm_count_reschedule?: number = 0

    @IsOptional()
    @IsDateString()
    edit_time?: Date

    @IsBoolean()
    @IsOptional()
    notify?: boolean = false

    @IsBoolean()
    @IsOptional()
    notify_24h?: boolean = false

    @IsBoolean()
    @IsOptional()
    notify_2h?: boolean = false

    @IsBoolean()
    @IsOptional()
    can_cancel?: boolean = true

    @IsOptional()
    @IsNumber()
    payment_status?: number = 1

    @IsOptional()
    @IsNumber()
    handyman_id?: number

    @IsOptional()
    @IsNumber()
    worker_id?: number

    @IsOptional()
    @IsNumber()
    labour_cost?: number

    @IsOptional()
    @IsNumber()
    material_cost?: number

    @IsOptional()
    @IsNumber()
    mobilization_cost?: number

    @IsOptional()
    @IsDateString()
    schedule_time?: Date

    @IsOptional()
    @IsDateString()
    arrive_time?: Date

    @IsOptional()
    @IsString()
    handyman_note?: string

    @IsOptional()
    @IsDateString()
    insert_time?: Date = convertToTimeZone(new Date, process.env.TIMEZONE_OFFSET)

    @IsNotEmpty()
    @IsNumber()
    insert_by?: number

    @IsOptional()
    @IsDateString()
    update_time?: Date

    @IsOptional()
    @IsNumber()
    update_by?: number

    @IsOptional()
    @IsDateString()
    delete_time?: Date

    @IsOptional()
    @IsNumber()
    delete_by?: number

    @IsOptional()
    @IsDateString()
    new_schedule_time?: Date

    @IsOptional()
    @IsString()
    complete_note?: string

    @IsOptional()
    @IsString()
    cancel_note?: string

    @IsOptional()
    @IsArray()
    offer_fixelist_id?: number[]

    @IsOptional()
    @IsString()
    fixelist_feedback?: string

    @IsNumber()
    @IsOptional()
    offer_id?: number

    @IsOptional()
    @IsString()
    fixel_feedback?: string

    @IsOptional()
    @IsBoolean()
    incomplete?: boolean = false

    @IsOptional()
    @IsDateString()
    payment_fixelist_time?: Date

    @IsOptional()
    @IsDateString()
    payment_fixel_time?: Date

    @IsBoolean()
    @IsBoolean()
    on_hold?: boolean = false

    @IsBoolean()
    @IsBoolean()
    approveFixelist?: boolean = false

    @IsBoolean()
    @IsBoolean()
    approveFixel?: boolean = false
  }  

export class JobViewDto {
    id: number
    code: string
    status: number
    insert_time: Date
    complete_time: Date
    schedule_time: Date
    cancel_time: Date
    customer: {
        id: number
        user_name: string
    }
    handyman_job_handyman_idTohandyman : {
        id: number
        name: string
    }
    handyman_job_worker_idTohandyman: {
        id: number
        name: string
    }
}

export class JobDtailGeneralInformationDto {
    id: number
    code: string
    is_urgent: boolean
    insert_time: Date
    schedule_time: Date
    complete_time: Date
    paid_amount: number
    gst_amount: number
    cancel_time: Date
    service: {
        name: string
    }
    customer: {
        id: number
        user_name: string
    }
    handyman_job_handyman_idTohandyman: {
        id: number
        name: string
    }
    handyman_job_worker_idTohandyman: {
        id: number
        name: string
    }
    address: {
        floor: string
        blk_no: string
        unit_no: string
        building: string
        street: string
        country: string
        post_code: string
    }
}  

export class JobGenerateInformationUpdateDto {

    @IsOptional()
    @IsBoolean()
    is_urgent? : boolean

    @IsOptional()
    @IsDate()
    insert_time? : Date

    @IsOptional()
    @IsDate()
    schedule_time? : Date

    @IsOptional()
    @IsDate()
    complete_time? : Date

    @IsOptional()
    @IsNumber()
    paid_amount? : number

    @IsOptional()
    @IsNumber()
    gst_amount? : number
}

export class ActionUserDto{
    @IsNotEmpty()
    user_id? : number
}