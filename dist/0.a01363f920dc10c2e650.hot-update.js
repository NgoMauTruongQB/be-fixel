"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 21:
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
exports.CustomerService = void 0;
const common_1 = __webpack_require__(6);
const prisma_service_1 = __webpack_require__(10);
const timezone_utility_1 = __webpack_require__(12);
let CustomerService = class CustomerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCustomers(paginationDto) {
        const { page = 1, limit = 9, username, email, status, startDate, endDate } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const filterConditions = {};
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
                filterConditions.activate_time = {
                    gte: startDate,
                    lte: endDate,
                };
            }
            const [customers, totalCount] = await Promise.all([
                this.prisma.customer.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        user_name: true,
                        name: true,
                        email: true,
                        status: true,
                        insert_time: true,
                        activate_time: true,
                        avatar: true,
                        delete_time: true
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.customer.count({
                    where: {
                        ...filterConditions,
                    },
                }),
            ]);
            const totalPages = Math.ceil(totalCount / limit);
            return { customers, totalPages, page };
        }
        catch (error) {
            throw error;
        }
    }
    async getGeneralInformation(id) {
        try {
            const customer = await this.prisma.customer.findUnique({
                where: {
                    delete_time: null,
                    id,
                },
                select: {
                    id: true,
                    status: true,
                    avatar: true,
                    user_name: true,
                    email: true,
                    name: true,
                    mobile_number: true,
                    activate_time: true,
                }
            });
            if (customer) {
                const payments = await this.prisma.payment.findMany({
                    where: { id },
                    select: { amount: true }
                });
                const totalAmount = payments.reduce((total, payment) => total + payment.amount, 0);
                const data = {
                    ...customer,
                    totalAmount
                };
                return data;
            }
            else {
                return null;
            }
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
                customer_id: id,
            };
            const jobs = await this.prisma.job.findMany({
                where: filterConditions,
                select: {
                    id: true,
                    code: true,
                    status: true,
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
                    insert_time: true,
                    schedule_time: true,
                    complete_time: true,
                    paid_amount: true,
                    payment_status: true,
                    payment: {
                        select: {
                            penalty: true,
                            refunded_amount: true,
                        },
                    },
                    update_time: true,
                },
                skip: Number(skip),
                take: Number(limit),
            });
            const jobsWithTotals = jobs.map((job) => {
                const totalRefundedAmount = job.payment.reduce((total, payment) => total + (payment.refunded_amount || 0), 0);
                const totalPenalty = job.payment.reduce((total, payment) => total + (payment.penalty || 0), 0);
                const { payment, ...jobWithoutPayment } = job;
                return {
                    ...jobWithoutPayment,
                    totalRefundedAmount,
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
                        customer_id: id
                    },
                    select: {
                        job_id: true,
                        job_code: true,
                        star_for_handyman: true,
                        content_for_handyman: true
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.review.count({
                    where: {
                        delete_time: null,
                        customer_id: id
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
                customer_id: id
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
    async getAddress(id, paginationDto) {
        const { page = 1, limit = 9 } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const filterConditions = {
                delete_time: null,
                customer_id: id
            };
            const [address, totalCount] = await Promise.all([
                this.prisma.address.findMany({
                    where: filterConditions,
                    select: {
                        id: true,
                        floor: true,
                        unit_no: true,
                        building: true,
                        home: true,
                        street: true,
                        country: true,
                        post_code: true,
                        default: true
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.address.count({
                    where: {
                        ...filterConditions
                    },
                }),
            ]);
            const totalPages = Math.ceil(totalCount / limit);
            return { address, totalPages, page };
        }
        catch (error) {
            throw error;
        }
    }
    async forceLogoutUser(id) {
        try {
            const data = await this.prisma.customer.update({
                where: { id },
                data: {
                    device_token: null,
                    googleToken: null
                }
            });
            if (data) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async softDeleteCustomer(id, actionUser) {
        try {
            const data = await this.prisma.customer.update({
                where: { id },
                data: {
                    delete_time: (0, timezone_utility_1.convertToTimeZone)(new Date, process.env.TIMEZONE_OFFSET),
                    delete_by: actionUser.user_id
                }
            });
            if (!data) {
                return false;
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async restoreCustomer(id, actionUser) {
        try {
            const data = await this.prisma.customer.update({
                where: { id },
                data: {
                    delete_time: null,
                    delete_by: null,
                    update_by: actionUser.user_id,
                    update_time: (0, timezone_utility_1.convertToTimeZone)(new Date, process.env.TIMEZONE_OFFSET)
                },
            });
            if (!data) {
                return false;
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async updateGeneralInformation(id, paginationDto) {
        try {
            const usernameExists = await this.isUsernameExistsForOtherCustomers(paginationDto.user_name, id);
            if (usernameExists && !paginationDto.is_delete_avatar) {
                throw new Error('Username already exists.');
            }
            const data = await this.prisma.customer.update({
                where: {
                    id: id,
                },
                data: {
                    name: paginationDto.name,
                    user_name: paginationDto.user_name,
                    mobile_number: paginationDto.mobile,
                    avatar: paginationDto.is_delete_avatar ? '' : undefined,
                    update_time: (0, timezone_utility_1.convertToTimeZone)(new Date, process.env.TIMEZONE_OFFSET),
                    update_by: paginationDto.actionUser
                },
            });
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async isUsernameExistsForOtherCustomers(username, currentCustomerId) {
        const existingUser = await this.prisma.customer.findFirst({
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
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], CustomerService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("fa31c5a4af859ded983f")
/******/ })();
/******/ 
/******/ }
;