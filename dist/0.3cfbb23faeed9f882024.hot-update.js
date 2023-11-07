"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 29:
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
exports.CSVService = void 0;
const common_1 = __webpack_require__(6);
const prisma_service_1 = __webpack_require__(10);
const date_fns_1 = __webpack_require__(33);
let CSVService = class CSVService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCustomersData() {
        const filterConditions = {
            delete_time: null
        };
        const customers = await this.prisma.customer.findMany({
            where: filterConditions,
            select: {
                id: true,
                user_name: true,
                name: true,
                email: true,
                mobile_number: true,
                address: {
                    where: {
                        default: true
                    },
                    select: {
                        floor: true,
                        unit_no: true,
                        building: true,
                        home: true,
                        street: true,
                        country: true,
                        post_code: true,
                    }
                },
                status: true,
                activate_time: true,
                review: true,
                job: {
                    select: {
                        status: true
                    }
                },
            },
        });
        const data = customers.map((customer) => {
            const formattedActivateTime = (0, date_fns_1.format)(new Date(customer.activate_time), 'yyyy-MM-dd HH:mm:ss');
            const addressData = customer.address[0] || {};
            const floor = addressData.floor || '';
            const unit_no = addressData.unit_no || '';
            const building = addressData.building || '';
            const home = addressData.home || '';
            const street = addressData.street || '';
            const country = addressData.country || '';
            const post_code = addressData.post_code || '';
            const address = [floor, unit_no, building, home, street, country, post_code].filter(Boolean).join(', ');
            const total_address = customer.address.length;
            const status = (customer.status == 2) ? 'ACTIVATED' : ((customer.status == 1) ? 'NEW' : '');
            const review = customer.review.length;
            const jobs_posted = customer.job.length;
            let jobs_completed = 0;
            let jobs_cancelled = 0;
            customer.job.forEach((job) => {
                if (job.status === 4) {
                    jobs_completed++;
                }
                if (job.status === 5) {
                    jobs_cancelled++;
                }
            });
            return {
                id: customer.id,
                user_name: customer.user_name,
                name: customer.name,
                email: customer.email,
                mobile_number: customer.mobile_number,
                address,
                total_address,
                status,
                activate_time: formattedActivateTime,
                review,
                jobs_posted,
                jobs_completed,
                jobs_cancelled,
            };
        });
        return data;
    }
};
exports.CSVService = CSVService;
exports.CSVService = CSVService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], CSVService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("034d441b704dd439f725")
/******/ })();
/******/ 
/******/ }
;