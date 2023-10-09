export class JobDto {
    id: number
    code: string
    status: number
    insert_time: Date
    complete_time: Date
    new_schedule_time: Date
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
  
    constructor(job: any) {
        this.id = job.id
        this.code = job.code
        this.status = job.status
        this.insert_time = job.insert_time
        this.complete_time = job.complete_time
        this.new_schedule_time = job.new_schedule_time
        this.customer = {
            id: job.customer?.id || null,
            user_name: job.customer?.user_name || null
        }
        this.handyman_job_handyman_idTohandyman = {
            id: job.handyman_job_handyman_idTohandyman?.id || null,
            name: job.handyman_job_handyman_idTohandyman?.name || null
        }
        this.handyman_job_worker_idTohandyman = {
            id: job.handyman_job_worker_idTohandyman?.id || null,
            name: job.handyman_job_worker_idTohandyman?.name || null
        }
    }
}

export class JobDtailGeneralInformation {
    
}
  