/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __resourceQuery = "?100";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.slice(1) || 0;
	var log = __webpack_require__(1);

	/**
	 * @param {boolean=} fromUpdate true when called from update
	 */
	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function (updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function (err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}


/***/ }),
/* 1 */
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";

function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
	logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(1);

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),
/* 3 */
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const common_1 = __webpack_require__(6);
const bodyParser = __webpack_require__(27);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use(bodyParser.urlencoded({ extended: true }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    await app.listen(process.env.PORT);
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(6);
const job_module_1 = __webpack_require__(7);
const customer_module_1 = __webpack_require__(19);
const fixelist_module_1 = __webpack_require__(23);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            job_module_1.JobModule,
            customer_module_1.CustomerModule,
            fixelist_module_1.FixelistModule
        ],
    })
], AppModule);


/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JobModule = void 0;
const common_1 = __webpack_require__(6);
const job_controller_1 = __webpack_require__(8);
const job_service_1 = __webpack_require__(9);
const prisma_service_1 = __webpack_require__(10);
let JobModule = class JobModule {
};
exports.JobModule = JobModule;
exports.JobModule = JobModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            job_controller_1.JobController
        ],
        providers: [
            job_service_1.JobService,
            prisma_service_1.PrismaService
        ]
    })
], JobModule);


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JobController = void 0;
const common_1 = __webpack_require__(6);
const job_service_1 = __webpack_require__(9);
const globalClass_1 = __webpack_require__(14);
const globalEnum_1 = __webpack_require__(15);
const job_dto_1 = __webpack_require__(16);
const job_dto_2 = __webpack_require__(16);
let JobController = class JobController {
    constructor(jobService) {
        this.jobService = jobService;
    }
    async getJobs(paginationDto) {
        try {
            const data = await this.jobService.getJobs(paginationDto);
            return new globalClass_1.ResponseData(data, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async getAllInformationJobById(id) {
        try {
            const data = await this.jobService.getAllInformationJobById(id);
            return new globalClass_1.ResponseData(data, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async getPendingJobs(paginationDto) {
        try {
            const data = await this.jobService.getPendingJobs(paginationDto);
            return new globalClass_1.ResponseData(data, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async getOffersByJob(id, paginationDto) {
        try {
            const data = await this.jobService.getOffersByJob(paginationDto, id);
            return new globalClass_1.ResponseData(data, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async getPaymentsByJob(id, paginationDto) {
        try {
            const data = await this.jobService.getPaymentsByJob(paginationDto, id);
            return new globalClass_1.ResponseData(data, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async createJob(jobDto) {
        try {
            const job = await this.jobService.createJob(jobDto);
            return new globalClass_1.ResponseData(job, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            console.log('ERROR: ', error);
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async softDeleteJob(id, actionUser) {
        try {
            const isDelete = await this.jobService.softDeleteJob(id, actionUser);
            return new globalClass_1.ResponseData(isDelete, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async restoreJob(id, actionUser) {
        try {
            const isRestore = await this.jobService.restoreJob(id, actionUser);
            return new globalClass_1.ResponseData(isRestore, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async cancelJob(id, actionUser) {
        try {
            const isCancel = await this.jobService.cancelJob(id, actionUser);
            return new globalClass_1.ResponseData(isCancel, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async getDetailGeneralInformation(id) {
        try {
            const jobDetail = await this.jobService.getDetailGeneralInformation(id);
            return new globalClass_1.ResponseData(jobDetail, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async updateProduct(jobDtailGeneralInformationDto, id) {
        try {
            const jobDetail = await this.jobService.updateGeneraInformation(id, jobDtailGeneralInformationDto);
            return new globalClass_1.ResponseData(jobDetail, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
};
exports.JobController = JobController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof job_dto_2.PaginationJobDto !== "undefined" && job_dto_2.PaginationJobDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], JobController.prototype, "getJobs", null);
__decorate([
    (0, common_1.Get)('all-information/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], JobController.prototype, "getAllInformationJobById", null);
__decorate([
    (0, common_1.Get)('pending-jobs'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof job_dto_2.PaginationJobDto !== "undefined" && job_dto_2.PaginationJobDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], JobController.prototype, "getPendingJobs", null);
__decorate([
    (0, common_1.Get)('offers-by-job/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof job_dto_2.PaginationJobDto !== "undefined" && job_dto_2.PaginationJobDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], JobController.prototype, "getOffersByJob", null);
__decorate([
    (0, common_1.Get)('payments-by-job/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_j = typeof job_dto_2.PaginationJobDto !== "undefined" && job_dto_2.PaginationJobDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], JobController.prototype, "getPaymentsByJob", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof job_dto_1.JobDto !== "undefined" && job_dto_1.JobDto) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], JobController.prototype, "createJob", null);
__decorate([
    (0, common_1.Put)('soft-delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_o = typeof job_dto_1.ActionUserDto !== "undefined" && job_dto_1.ActionUserDto) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], JobController.prototype, "softDeleteJob", null);
__decorate([
    (0, common_1.Put)('restore/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_q = typeof job_dto_1.ActionUserDto !== "undefined" && job_dto_1.ActionUserDto) === "function" ? _q : Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], JobController.prototype, "restoreJob", null);
__decorate([
    (0, common_1.Put)('cancel-job/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_s = typeof job_dto_1.ActionUserDto !== "undefined" && job_dto_1.ActionUserDto) === "function" ? _s : Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], JobController.prototype, "cancelJob", null);
__decorate([
    (0, common_1.Get)('general-information/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], JobController.prototype, "getDetailGeneralInformation", null);
__decorate([
    (0, common_1.Put)('general-information/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof job_dto_1.JobDtailGeneralInformationDto !== "undefined" && job_dto_1.JobDtailGeneralInformationDto) === "function" ? _v : Object, Number]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], JobController.prototype, "updateProduct", null);
exports.JobController = JobController = __decorate([
    (0, common_1.Controller)('/api/job'),
    __metadata("design:paramtypes", [typeof (_a = typeof job_service_1.JobService !== "undefined" && job_service_1.JobService) === "function" ? _a : Object])
], JobController);


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(6);
const client_1 = __webpack_require__(11);
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),
/* 11 */
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertToTimeZone = void 0;
function convertToTimeZone(date, timezoneOffset) {
    const utcTime = date.getTime();
    const localTime = utcTime + Number(timezoneOffset);
    return new Date(localTime);
}
exports.convertToTimeZone = convertToTimeZone;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateSixDigitCode = void 0;
function generateSixDigitCode() {
    const yearLastTwoDigits = String(new Date().getFullYear() % 100).padStart(2, '0');
    const randomDigits = String(Math.floor(Math.random() * 900) + 100);
    const code = `0${yearLastTwoDigits}${randomDigits}`;
    return code;
}
exports.generateSixDigitCode = generateSixDigitCode;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseData = void 0;
class ResponseData {
    constructor(data, statusCode, messgae) {
        this.data = data;
        this.statusCode = statusCode;
        this.message = messgae;
        return this;
    }
}
exports.ResponseData = ResponseData;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpMessage = exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["ERROR"] = 404] = "ERROR";
    HttpStatus[HttpStatus["SUCCESS"] = 200] = "SUCCESS";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
var HttpMessage;
(function (HttpMessage) {
    HttpMessage["ERROR"] = "Server Internal error!";
    HttpMessage["SUCCESS"] = "Server Respone Success!";
})(HttpMessage || (exports.HttpMessage = HttpMessage = {}));


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationJobDto = exports.ActionUserDto = exports.JobGenerateInformationUpdateDto = exports.JobDtailGeneralInformationDto = exports.JobViewDto = exports.JobDto = void 0;
const class_validator_1 = __webpack_require__(17);
const timezone_utility_1 = __webpack_require__(12);
const class_transformer_1 = __webpack_require__(18);
class JobDto {
    constructor() {
        this.is_urgent = false;
        this.indicative_value = 1;
        this.expect_time = (0, timezone_utility_1.convertToTimeZone)(new Date, process.env.TIMEZONE_OFFSET);
        this.status = 1;
        this.is_abort = true;
        this.count_reschedule = 0;
        this.hm_count_reschedule = 0;
        this.notify = false;
        this.notify_24h = false;
        this.notify_2h = false;
        this.can_cancel = true;
        this.payment_status = 1;
        this.insert_time = (0, timezone_utility_1.convertToTimeZone)(new Date, process.env.TIMEZONE_OFFSET);
        this.incomplete = false;
        this.on_hold = false;
        this.approveFixelist = false;
        this.approveFixel = false;
    }
}
exports.JobDto = JobDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], JobDto.prototype, "customer_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "service_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "address_id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], JobDto.prototype, "is_urgent", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], JobDto.prototype, "paid_amount", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], JobDto.prototype, "gst_amount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], JobDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], JobDto.prototype, "video", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "indicative_value", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], JobDto.prototype, "expect_time", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], JobDto.prototype, "expire_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], JobDto.prototype, "progress_time", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], JobDto.prototype, "complete_time", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], JobDto.prototype, "owner_complete_time", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], JobDto.prototype, "cancel_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "cancel_by", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], JobDto.prototype, "is_abort", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "complete_by", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "count_reschedule", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "hm_count_reschedule", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], JobDto.prototype, "edit_time", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], JobDto.prototype, "notify", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], JobDto.prototype, "notify_24h", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], JobDto.prototype, "notify_2h", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], JobDto.prototype, "can_cancel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "payment_status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "handyman_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "worker_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "labour_cost", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "material_cost", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "mobilization_cost", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], JobDto.prototype, "schedule_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
], JobDto.prototype, "arrive_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobDto.prototype, "handyman_note", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
], JobDto.prototype, "insert_time", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "insert_by", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_l = typeof Date !== "undefined" && Date) === "function" ? _l : Object)
], JobDto.prototype, "update_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "update_by", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_m = typeof Date !== "undefined" && Date) === "function" ? _m : Object)
], JobDto.prototype, "delete_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobDto.prototype, "delete_by", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_o = typeof Date !== "undefined" && Date) === "function" ? _o : Object)
], JobDto.prototype, "new_schedule_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobDto.prototype, "complete_note", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobDto.prototype, "cancel_note", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], JobDto.prototype, "offer_fixelist_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobDto.prototype, "fixelist_feedback", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], JobDto.prototype, "offer_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobDto.prototype, "fixel_feedback", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], JobDto.prototype, "incomplete", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_p = typeof Date !== "undefined" && Date) === "function" ? _p : Object)
], JobDto.prototype, "payment_fixelist_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_q = typeof Date !== "undefined" && Date) === "function" ? _q : Object)
], JobDto.prototype, "payment_fixel_time", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], JobDto.prototype, "on_hold", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], JobDto.prototype, "approveFixelist", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], JobDto.prototype, "approveFixel", void 0);
class JobViewDto {
}
exports.JobViewDto = JobViewDto;
class JobDtailGeneralInformationDto {
}
exports.JobDtailGeneralInformationDto = JobDtailGeneralInformationDto;
class JobGenerateInformationUpdateDto {
}
exports.JobGenerateInformationUpdateDto = JobGenerateInformationUpdateDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], JobGenerateInformationUpdateDto.prototype, "is_urgent", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", typeof (_r = typeof Date !== "undefined" && Date) === "function" ? _r : Object)
], JobGenerateInformationUpdateDto.prototype, "insert_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", typeof (_s = typeof Date !== "undefined" && Date) === "function" ? _s : Object)
], JobGenerateInformationUpdateDto.prototype, "schedule_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", typeof (_t = typeof Date !== "undefined" && Date) === "function" ? _t : Object)
], JobGenerateInformationUpdateDto.prototype, "complete_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobGenerateInformationUpdateDto.prototype, "paid_amount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobGenerateInformationUpdateDto.prototype, "gst_amount", void 0);
class ActionUserDto {
}
exports.ActionUserDto = ActionUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ActionUserDto.prototype, "user_id", void 0);
class PaginationJobDto {
}
exports.PaginationJobDto = PaginationJobDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationJobDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationJobDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationJobDto.prototype, "service_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationJobDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationJobDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationJobDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], PaginationJobDto.prototype, "priority", void 0);


/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";
module.exports = require("class-validator");

/***/ }),
/* 18 */
/***/ ((module) => {

"use strict";
module.exports = require("class-transformer");

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerModule = void 0;
const common_1 = __webpack_require__(6);
const customer_controller_1 = __webpack_require__(20);
const customer_service_1 = __webpack_require__(21);
const prisma_service_1 = __webpack_require__(10);
let CustomerModule = class CustomerModule {
};
exports.CustomerModule = CustomerModule;
exports.CustomerModule = CustomerModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            customer_controller_1.CustomerController
        ],
        providers: [
            customer_service_1.CustomerService,
            prisma_service_1.PrismaService
        ]
    })
], CustomerModule);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerController = void 0;
const common_1 = __webpack_require__(6);
const customer_service_1 = __webpack_require__(21);
const globalClass_1 = __webpack_require__(14);
const customer_dto_1 = __webpack_require__(22);
const globalEnum_1 = __webpack_require__(15);
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async getCustomer(paginationDto) {
        try {
            const data = await this.customerService.getCustomers(paginationDto);
            return new globalClass_1.ResponseData(data, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async getGeneralInformationById(id) {
        try {
            const data = await this.customerService.getGeneralInformation(id);
            return new globalClass_1.ResponseData(data, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async getJobs(id, paginationDto) {
        try {
            const job = await this.customerService.getJob(id, paginationDto);
            return new globalClass_1.ResponseData(job, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async getReviews(id, paginationDto) {
        try {
            const reviews = await this.customerService.getReviews(id, paginationDto);
            return new globalClass_1.ResponseData(reviews, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async forceLogoutUser(id) {
        try {
            const isLogout = await this.customerService.forceLogoutUser(id);
            return new globalClass_1.ResponseData(isLogout, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async softDeleteCustomer(id, actionUser) {
        try {
            const isDelete = await this.customerService.softDeleteCustomer(id, actionUser);
            return new globalClass_1.ResponseData(isDelete, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async restoreCustomer(id, actionUser) {
        try {
            const isRestore = await this.customerService.restoreCustomer(id, actionUser);
            return new globalClass_1.ResponseData(isRestore, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async changeAddress(id, addressDto) {
        try {
            const address = await this.customerService.changeAddress(id, addressDto);
            return new globalClass_1.ResponseData(address, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async getCustomerPayment(id, paginationDto) {
        try {
            const payment = await this.customerService.getCustomerPayment(id, paginationDto);
            return new globalClass_1.ResponseData(payment, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof customer_dto_1.PaginationCustomerDto !== "undefined" && customer_dto_1.PaginationCustomerDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CustomerController.prototype, "getCustomer", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CustomerController.prototype, "getGeneralInformationById", null);
__decorate([
    (0, common_1.Get)('/:id/job'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof customer_dto_1.PaginationDto !== "undefined" && customer_dto_1.PaginationDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CustomerController.prototype, "getJobs", null);
__decorate([
    (0, common_1.Get)('/:id/reviews'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof customer_dto_1.PaginationDto !== "undefined" && customer_dto_1.PaginationDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], CustomerController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], CustomerController.prototype, "forceLogoutUser", null);
__decorate([
    (0, common_1.Put)('soft-delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_k = typeof customer_dto_1.ActionUserDto !== "undefined" && customer_dto_1.ActionUserDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], CustomerController.prototype, "softDeleteCustomer", null);
__decorate([
    (0, common_1.Put)('restore/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_m = typeof customer_dto_1.ActionUserDto !== "undefined" && customer_dto_1.ActionUserDto) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], CustomerController.prototype, "restoreCustomer", null);
__decorate([
    (0, common_1.Put)('change-address/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_p = typeof customer_dto_1.AddressDto !== "undefined" && customer_dto_1.AddressDto) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], CustomerController.prototype, "changeAddress", null);
__decorate([
    (0, common_1.Get)('/:id/payment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_r = typeof customer_dto_1.PaginationPaymentDto !== "undefined" && customer_dto_1.PaginationPaymentDto) === "function" ? _r : Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerPayment", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)('/api/customer'),
    __metadata("design:paramtypes", [typeof (_a = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" ? _a : Object])
], CustomerController);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
                        avatar: true
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
                        insert_by: id
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
    async changeAddress(id, addressDto) {
        try {
            const data = await this.prisma.address.update({
                where: { id },
                data: {
                    default: addressDto.is_default,
                    blk_no: addressDto.blk_no,
                    floor: addressDto.floor,
                    unit_no: addressDto.floor,
                    building: addressDto.building,
                    street: addressDto.street,
                    country: addressDto.country,
                    post_code: addressDto.post_code,
                    update_time: (0, timezone_utility_1.convertToTimeZone)(new Date, process.env.TIMEZONE_OFFSET),
                    home: addressDto.is_home,
                    update_by: addressDto.update_by,
                }
            });
            if (!data) {
                return false;
            }
            return true;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getCustomerPayment(id, paginationDto) {
        const { page = 1, limit = 9, job_code, status } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const filterConditions = {
                delete_time: null,
                customer_id: id
            };
            if (job_code) {
                filterConditions.job_code = job_code;
            }
            if (status) {
                filterConditions.status = status;
            }
            const [payments, totalCount] = await Promise.all([
                this.prisma.payment.findMany({
                    where: filterConditions,
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
                        handyman: {
                            select: {
                                id: true,
                                name: true,
                                user_name: true,
                                mobile_number: true,
                            }
                        }
                    },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.job.count({
                    where: {
                        delete_time: null,
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
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], CustomerService);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewDto = exports.PaginationPaymentDto = exports.PaginationDto = exports.AddressDto = exports.ActionUserDto = exports.PaginationCustomerDto = exports.CustomerDto = void 0;
const class_transformer_1 = __webpack_require__(18);
const class_validator_1 = __webpack_require__(17);
class CustomerDto {
}
exports.CustomerDto = CustomerDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CustomerDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "user_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "mobile_number", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CustomerDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "name", void 0);
class PaginationCustomerDto {
}
exports.PaginationCustomerDto = PaginationCustomerDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationCustomerDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationCustomerDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationCustomerDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationCustomerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationCustomerDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], PaginationCustomerDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], PaginationCustomerDto.prototype, "endDate", void 0);
class ActionUserDto {
}
exports.ActionUserDto = ActionUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ActionUserDto.prototype, "user_id", void 0);
class AddressDto {
}
exports.AddressDto = AddressDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddressDto.prototype, "is_default", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddressDto.prototype, "blk_no", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "floor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "unit_no", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "building", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "post_code", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddressDto.prototype, "is_home", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddressDto.prototype, "update_by", void 0);
class PaginationDto {
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
class PaginationPaymentDto {
}
exports.PaginationPaymentDto = PaginationPaymentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationPaymentDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationPaymentDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationPaymentDto.prototype, "job_code", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PaginationPaymentDto.prototype, "status", void 0);
class ReviewDto {
}
exports.ReviewDto = ReviewDto;


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FixelistModule = void 0;
const common_1 = __webpack_require__(6);
const fixelist_controller_1 = __webpack_require__(24);
const fixelist_service_1 = __webpack_require__(25);
const prisma_service_1 = __webpack_require__(10);
let FixelistModule = class FixelistModule {
};
exports.FixelistModule = FixelistModule;
exports.FixelistModule = FixelistModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            fixelist_controller_1.FixelistController
        ],
        providers: [
            fixelist_service_1.FixelistService,
            prisma_service_1.PrismaService
        ]
    })
], FixelistModule);


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FixelistController = void 0;
const common_1 = __webpack_require__(6);
const fixelist_service_1 = __webpack_require__(25);
const fixelist_dto_1 = __webpack_require__(26);
const globalClass_1 = __webpack_require__(14);
const globalEnum_1 = __webpack_require__(15);
let FixelistController = class FixelistController {
    constructor(fixelistService) {
        this.fixelistService = fixelistService;
    }
    async getFixelist(paginationDto) {
        try {
            const data = await this.fixelistService.getFixelist(paginationDto);
            return new globalClass_1.ResponseData(data, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
};
exports.FixelistController = FixelistController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof fixelist_dto_1.PaginationFixelistDto !== "undefined" && fixelist_dto_1.PaginationFixelistDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], FixelistController.prototype, "getFixelist", null);
exports.FixelistController = FixelistController = __decorate([
    (0, common_1.Controller)('/api/fixelist'),
    __metadata("design:paramtypes", [typeof (_a = typeof fixelist_service_1.FixelistService !== "undefined" && fixelist_service_1.FixelistService) === "function" ? _a : Object])
], FixelistController);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
let FixelistService = class FixelistService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFixelist(paginationDto) {
        const { page = 1, limit = 9, email, username, service } = paginationDto;
        const skip = (page - 1) * limit;
        console.log(service);
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
            if (service) {
                filterConditions.services = {
                    hasSome: [service]
                };
            }
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
            ]);
            const totalPages = Math.ceil(totalCount / limit);
            return { fixelist, totalPages, page };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
};
exports.FixelistService = FixelistService;
exports.FixelistService = FixelistService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], FixelistService);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationFixelistDto = void 0;
const class_transformer_1 = __webpack_require__(18);
const class_validator_1 = __webpack_require__(17);
class PaginationFixelistDto {
}
exports.PaginationFixelistDto = PaginationFixelistDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationFixelistDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationFixelistDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], PaginationFixelistDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationFixelistDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10), { toClassOnly: true }),
    __metadata("design:type", Number)
], PaginationFixelistDto.prototype, "service", void 0);


/***/ }),
/* 27 */
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("33cc7955caa0eb3b42c4")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = __webpack_require__.hmrS_require = __webpack_require__.hmrS_require || {
/******/ 			0: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			})['catch'](function(err) { if(err.code !== 'MODULE_NOT_FOUND') throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(0);
/******/ 	var __webpack_exports__ = __webpack_require__(3);
/******/ 	
/******/ })()
;