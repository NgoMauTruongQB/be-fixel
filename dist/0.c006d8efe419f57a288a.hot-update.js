"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 25:
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
exports.FixelistService = void 0;
const common_1 = __webpack_require__(6);
const prisma_service_1 = __webpack_require__(10);
const timezone_utility_1 = __webpack_require__(12);
let FixelistService = class FixelistService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFixelist(paginationDto) {
        const { page = 1, limit = 9, email, username, status, startDate, endDate } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const filterConditions = {
                delete_time: null,
            };
            if (username) {
                filterConditions.user_name = username;
            }
            if (email) {
                filterConditions.email = email;
            }
            if (status) {
                filterConditions.status = status;
            }
            if (startDate && endDate) {
                filterConditions.insert_time = {
                    gte: startDate,
                    lte: endDate,
                };
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
            ]);
            const totalPages = Math.ceil(totalCount / limit);
            return { fixelist, totalPages, page };
        }
        catch (error) {
            throw error;
        }
    }
    async getGeneralInformation(id) {
        try {
            const handyman = await this.prisma.handyman.findUnique({
                where: {
                    delete_time: null,
                    id,
                },
                select: {
                    id: true,
                    status: true,
                    role: true,
                    avatar: true,
                    user_name: true,
                    email: true,
                    review: true,
                    name: true,
                    mobile_number: true,
                    approve_time: true,
                    services: true,
                    address: true,
                    gst: true,
                    uen: true,
                    recipient: {
                        where: { delete_time: null },
                        select: {
                            bank_name: true,
                            bank_number: true,
                            bank_brand: true,
                            insert_time: true,
                        }
                    }
                }
            });
            return handyman;
        }
        catch (error) {
            throw error;
        }
    }
    async getJob(id, paginationDto) {
        const { page = 1, limit = 9 } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const filterConditions = {
                delete_time: null,
                handyman_id: id,
            };
            const jobs = await this.prisma.job.findMany({
                where: filterConditions,
                select: {
                    id: true,
                    code: true,
                    status: true,
                    customer: { select: { id: true, user_name: true } },
                    handyman_job_worker_idTohandyman: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    insert_time: true,
                    schedule_time: true,
                    complete_time: true,
                    paid_amount: true,
                    payment: {
                        select: {
                            penalty: true
                        }
                    },
                    payment_fixelist_time: true,
                    payment_status: true,
                },
                skip: Number(skip),
                take: Number(limit),
            });
            const jobsWithTotals = jobs.map((job) => {
                const totalPenalty = job.payment.reduce((total, payment) => total + (payment.penalty || 0), 0);
                const { payment, ...jobWithoutPayment } = job;
                return {
                    ...jobWithoutPayment,
                    totalPenalty,
                };
            });
            const totalPages = Math.ceil(jobsWithTotals.length / limit);
            return { jobs: jobsWithTotals, totalPages, page };
        }
        catch (error) {
            throw error;
        }
    }
    async getReviews(id, paginationDto) {
        const { page = 1, limit = 9 } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const [reviews, totalCount] = await Promise.all([
                this.prisma.review.findMany({
                    where: {
                        delete_time: null,
                        handyman_id: id
                    },
                    select: {
                        job_id: true,
                        job_code: true,
                        star_for_customer: true,
                        content_for_customer: true
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.review.count({
                    where: {
                        delete_time: null,
                        handyman_id: id
                    },
                }),
            ]);
            const totalPages = Math.ceil(totalCount / limit);
            return { reviews, totalPages, page };
        }
        catch (error) {
            throw error;
        }
    }
    async getPayment(id, paginationDto) {
        const { page = 1, limit = 9 } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const filterConditions = {
                delete_time: null,
                handyman_id: id
            };
            const [payments, totalCount] = await Promise.all([
                this.prisma.payment.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        insert_time: true,
                        charge_id: true,
                        job_code: true,
                        type: true,
                        status: true,
                        amount: true,
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.payment.count({
                    where: {
                        ...filterConditions
                    },
                }),
            ]);
            const totalPages = Math.ceil(totalCount / limit);
            return { payments, totalPages, page };
        }
        catch (error) {
            throw error;
        }
    }
    async getWorkers(id, paginationDto) {
        const { page = 1, limit = 9 } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const filterConditions = {
                delete_time: null,
                id
            };
            const [payments, totalCount] = await Promise.all([
                this.prisma.handyman.findMany({
                    where: filterConditions,
                    select: {
                        other_handyman: {
                            select: {
                                user_name: true,
                                email: true,
                                mobile_number: true,
                                status: true,
                                approve_time: true
                            }
                        }
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.payment.count({
                    where: {
                        ...filterConditions
                    },
                }),
            ]);
            const totalPages = Math.ceil(totalCount / limit);
            return { payments, totalPages, page };
        }
        catch (error) {
            throw error;
        }
    }
    async updateGeneralInformation(id, paginationDto) {
        try {
            const usernameExists = await this.isUsernameExistsForOtherHandyman(paginationDto.user_name, id);
            if (usernameExists && !paginationDto.is_delete_avatar) {
                throw new Error('Username already exists.');
            }
            var data = await this.prisma.handyman.update({
                where: {
                    id: id,
                },
                data: {
                    name: paginationDto.company_name,
                    user_name: paginationDto.user_name,
                    mobile_number: paginationDto.mobile,
                    avatar: paginationDto.is_delete_avatar ? '' : undefined,
                    update_time: (0, timezone_utility_1.convertToTimeZone)(new Date, process.env.TIMEZONE_OFFSET),
                    update_by: paginationDto.actionUser,
                    address: paginationDto.company_address,
                    uen: paginationDto.uen_number,
                    gst: paginationDto.gst_number,
                    services: paginationDto.services
                },
            });
            return data ? true : false;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async isUsernameExistsForOtherHandyman(username, currentCustomerId) {
        const existingUser = await this.prisma.handyman.findFirst({
            where: {
                user_name: username,
                NOT: {
                    id: currentCustomerId,
                },
            },
        });
        return !!existingUser;
    }
};
exports.FixelistService = FixelistService;
exports.FixelistService = FixelistService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], FixelistService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("898d526fe4f378ecfd60")
/******/ })();
/******/ 
/******/ }
;