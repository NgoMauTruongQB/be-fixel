"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 9:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JobService = void 0;
const common_1 = __webpack_require__(6);
const prisma_service_1 = __webpack_require__(10);
const timezone_utility_1 = __webpack_require__(12);
const uniqueDigitsCode_1 = __webpack_require__(13);
let JobService = class JobService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getJobs(paginationDto) {
        const { page = 1, limit = 9, service_id, status, username, id, priority } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const filterConditions = {
                delete_time: null,
            };
            if (service_id) {
                filterConditions.service_id = Number(service_id);
            }
            if (status) {
                filterConditions.status = Number(status);
            }
            if (priority) {
                filterConditions.is_urgent = Boolean(priority);
            }
            if (id) {
                filterConditions.code = String(id);
            }
            if (username) {
                filterConditions.customer = {
                    user_name: username,
                };
            }
            const [jobs, totalCount] = await Promise.all([
                this.prisma.job.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        code: true,
                        status: true,
                        service_id: true,
                        insert_time: true,
                        complete_time: true,
                        schedule_time: true,
                        cancel_time: true,
                        customer: {
                            select: {
                                id: true,
                                user_name: true,
                            },
                        },
                        handyman_job_handyman_idTohandyman: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        handyman_job_worker_idTohandyman: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.job.count({
                    where: {
                        ...filterConditions
                    },
                }),
            ]);
            console.log(totalCount);
            console.log(limit);
            const totalPages = Math.ceil(totalCount / limit);
            return { jobs, totalPages, page };
        }
        catch (error) {
            throw error;
        }
    }
    async getAllInformationJobById(id) {
        try {
            const job = this.prisma.job.findUnique({
                where: {
                    delete_time: null,
                    id,
                },
                select: {
                    id: true,
                    status: true,
                    is_abort: true,
                    is_urgent: true,
                    image: true,
                    video: true,
                    note: true,
                    insert_time: true,
                    complete_time: true,
                    indicative_value: true,
                    expect_time: true,
                    schedule_time: true,
                    labour_cost: true,
                    material_cost: true,
                    mobilization_cost: true,
                    gst_amount: true,
                    paid_amount: true,
                    payment_status: true,
                    code: true,
                    owner_complete_time: true,
                    assign_worker_histories: {
                        select: {
                            handyman_assign_worker_histories_handyman_idTohandyman: {
                                select: {
                                    id: true,
                                    user_name: true,
                                    name: true,
                                    avatar: true
                                }
                            },
                            assign_time: true
                        }
                    },
                    worker_id: true,
                    cancel_by: true,
                    payment_fixel_time: true,
                    payment_fixelist_time: true,
                    milestone: {
                        where: {
                            delete_time: null,
                        }
                    },
                    customer: {
                        select: {
                            id: true,
                            user_name: true,
                            address: {
                                where: { default: true }
                            },
                            mobile_number: true,
                            home_number: true,
                            star: true
                        },
                    },
                    service: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    extra: {
                        select: {
                            type: true,
                            amount: true,
                            status: true,
                            insert_time: true,
                            accept_time: true,
                            note: true,
                            gst: true,
                            handyman: {
                                select: {
                                    user_name: true,
                                    avatar: true
                                }
                            },
                            customer: {
                                select: {
                                    user_name: true,
                                    avatar: true
                                }
                            }
                        }
                    },
                    review: {
                        select: {
                            job_code: true,
                            star_for_customer: true,
                            star_for_handyman: true,
                            content_for_customer: true,
                            content_for_handyman: true,
                            active_for_customer: true,
                            active_for_handyman: true,
                            handyman: {
                                select: {
                                    id: true,
                                    user_name: true
                                }
                            },
                            customer: {
                                select: {
                                    id: true,
                                    user_name: true
                                }
                            }
                        }
                    },
                    handyman_job_handyman_idTohandyman: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    handyman_job_worker_idTohandyman: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    reschedule: true,
                    new_schedule_time: true,
                    progress_time: true,
                    cancel_time: true,
                    incomplete: true,
                    offer_offer_job_idTojob: {
                        select: {
                            labour_cost: true,
                            gst: true,
                            material_cost: true,
                            mobilization_cost: true,
                            history_offer: {
                                where: {
                                    schedule_time: { not: null },
                                    OR: [{ status: null }, { status: { lt: 10 } }],
                                    delete_time: null
                                },
                                select: {
                                    id: true,
                                    status: true,
                                    note: true,
                                    schedule_time: true,
                                    insert_time: true,
                                    handyman: {
                                        select: {
                                            id: true,
                                            user_name: true,
                                            name: true,
                                            avatar: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    feedback: {
                        select: {
                            id: true,
                            insert_time: true,
                            insert_by: true,
                            feedback_photo: true,
                            note: true,
                            customer: true,
                            handyman: true,
                            completeTime: true,
                            incompleteTime: true,
                            cancelTime: true
                        }
                    },
                    history_action: {
                        where: {
                            delete_time: null
                        },
                        select: {
                            id: true,
                            content: true,
                            action_time: true,
                            schedule_time: true,
                            status: true,
                            note: true,
                            handyman: {
                                select: {
                                    id: true,
                                    user_name: true,
                                    name: true,
                                    avatar: true
                                }
                            },
                            customer: {
                                select: {
                                    id: true,
                                    user_name: true,
                                    name: true,
                                    avatar: true
                                }
                            },
                        }
                    }
                }
            });
            return job;
        }
        catch (error) {
            throw error;
        }
    }
    async getPendingJobs(paginationDto) {
        const { page = 1, limit = 9 } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const [jobs, totalCount] = await Promise.all([
                this.prisma.job.findMany({
                    where: {
                        delete_time: null,
                        status: { not: 5 }
                    },
                    select: {
                        id: true,
                        code: true,
                        status: true,
                        insert_time: true,
                        complete_time: true,
                        schedule_time: true,
                        cancel_time: true,
                        customer: {
                            select: {
                                id: true,
                                user_name: true,
                            },
                        },
                        handyman_job_handyman_idTohandyman: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        handyman_job_worker_idTohandyman: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.job.count({
                    where: {
                        delete_time: null,
                        status: { not: 5 }
                    },
                }),
            ]);
            const totalPages = Math.ceil(totalCount / limit);
            return { jobs, totalPages, page };
        }
        catch (error) {
            throw error;
        }
    }
    async getOffersByJob(paginationDto, id) {
        const { page = 1, limit = 9 } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const [offers, totalCount] = await Promise.all([
                this.prisma.offer.findMany({
                    where: {
                        delete_time: null,
                        job_id: id
                    },
                    select: {
                        id: true,
                        labour_cost: true,
                        material_cost: true,
                        mobilization_cost: true,
                        gst: true,
                        note: true,
                        schedule_time: true,
                        status: true,
                        expire_time: true,
                        arrive_time: true,
                        cancel_time: true,
                        insert_time: true,
                        update_time: true,
                        handyman: {
                            select: {
                                id: true,
                                user_name: true,
                                name: true,
                                mobile_number: true
                            }
                        }
                    },
                    skip: Number(skip),
                    take: Number(limit)
                }),
                this.prisma.offer.count({
                    where: {
                        delete_time: null,
                        job_id: id
                    },
                }),
            ]);
            const totalPages = Math.ceil(totalCount / limit);
            return { offers, totalPages, page };
        }
        catch (error) {
            throw error;
        }
    }
    async getPaymentsByJob(paginationDto, id) {
        const { page = 1, limit = 9 } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const [payments, totalCount] = await Promise.all([
                this.prisma.payment.findMany({
                    where: {
                        job_id: id,
                        delete_time: null
                    },
                    select: {
                        id: true,
                        type: true,
                        job_code: true,
                        amount: true,
                        net: true,
                        fee: true,
                        fee_vat: true,
                        interest: true,
                        interest_vat: true,
                        currency: true,
                        paid: true,
                        status: true,
                        charge_id: true,
                        ref_charge_id: true,
                        customer: {
                            select: {
                                id: true,
                                name: true,
                                user_name: true,
                                mobile_number: true
                            }
                        },
                        handyman: {
                            select: {
                                id: true,
                                name: true,
                                user_name: true,
                                mobile_number: true
                            }
                        }
                    },
                    skip: Number(skip),
                    take: Number(limit)
                }),
                this.prisma.payment.count({
                    where: {
                        job_id: id,
                        delete_time: null
                    }
                })
            ]);
            const totalPages = Math.ceil(totalCount / limit);
            return {
                payments,
                totalPages,
                page
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getDetailGeneralInformation(id) {
        try {
            const job = await this.prisma.job.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    id: true,
                    code: true,
                    is_urgent: true,
                    insert_time: true,
                    schedule_time: true,
                    complete_time: true,
                    gst_amount: true,
                    paid_amount: true,
                    cancel_time: true,
                    status: true,
                    cancel_by: true,
                    service: {
                        select: { name: true }
                    },
                    customer: {
                        select: {
                            id: true,
                            user_name: true,
                        }
                    },
                    handyman_job_handyman_idTohandyman: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    handyman_job_worker_idTohandyman: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    address: {
                        select: {
                            floor: true,
                            blk_no: true,
                            unit_no: true,
                            building: true,
                            street: true,
                            country: true,
                            post_code: true
                        }
                    }
                }
            });
            return job;
        }
        catch (error) {
            throw error;
        }
    }
    async updateGeneraInformation(id, jobGenerateInformationDto) {
        try {
            const { is_urgent, insert_time, schedule_time, complete_time, paid_amount, gst_amount, } = jobGenerateInformationDto;
            const updatedJob = await this.prisma.job.update({
                where: {
                    id: Number(id)
                },
                data: {
                    is_urgent,
                    insert_time,
                    schedule_time,
                    complete_time,
                    paid_amount,
                    gst_amount
                }
            });
            return updatedJob;
        }
        catch (error) {
            throw error;
        }
    }
    async softDeleteJob(id, actionUser) {
        try {
            const data = await this.prisma.job.update({
                where: { id },
                data: {
                    delete_time: (0, timezone_utility_1.convertToTimeZone)(new Date, process.env.TIMEZONE_OFFSET),
                    delete_by: actionUser.user_id
                }
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async restoreJob(id, actionUser) {
        try {
            await this.prisma.job.update({
                where: { id },
                data: {
                    delete_time: null,
                    delete_by: null,
                    update_by: actionUser.user_id,
                    update_time: (0, timezone_utility_1.convertToTimeZone)(new Date, process.env.TIMEZONE_OFFSET)
                },
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async createJob(jobDto) {
        try {
            const { customer_id, service_id, address_id, ...restJobDto } = jobDto;
            const service = await this.prisma.service.findUnique({
                where: { id: service_id },
                select: { code: true }
            });
            if (!service) {
                throw new Error('Service not found.');
            }
            const sixDigitCode = (0, uniqueDigitsCode_1.generateSixDigitCode)();
            const code = `${service.code}#${sixDigitCode}`;
            const data = {
                ...restJobDto,
                code,
                customer: { connect: { id: customer_id } },
                service: { connect: { id: service_id } },
                address: { connect: { id: address_id } },
            };
            const job = await this.prisma.job.create({
                data,
            });
            return job;
        }
        catch (error) {
            throw error;
        }
    }
    async cancelJob(id, actionUser) {
        try {
            await this.prisma.job.updateMany({
                where: { id },
                data: {
                    cancel_time: (0, timezone_utility_1.convertToTimeZone)(new Date, process.env.TIMEZONE_OFFSET),
                    cancel_by: actionUser.user_id,
                    update_by: actionUser.user_id,
                    update_time: (0, timezone_utility_1.convertToTimeZone)(new Date, process.env.TIMEZONE_OFFSET),
                    status: 5
                }
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], JobService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b7b718df0aca314a742c")
/******/ })();
/******/ 
/******/ }
;