"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 20:
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
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
    async getCustomerPayment(id, paginationDto) {
        try {
            const payment = await this.customerService.getPayment(id, paginationDto);
            return new globalClass_1.ResponseData(payment, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async getAddress(id, paginationDto) {
        try {
            const address = await this.customerService.getAddress(id, paginationDto);
            return new globalClass_1.ResponseData(address, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async updateGeneralInformation(id, paginationDto) {
        try {
            const data = await this.customerService.updateGeneralInformation(id, paginationDto);
            return new globalClass_1.ResponseData(data, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, error.message);
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
    (0, common_1.Get)('/:id/payment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_p = typeof customer_dto_1.PaginationPaymentDto !== "undefined" && customer_dto_1.PaginationPaymentDto) === "function" ? _p : Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerPayment", null);
__decorate([
    (0, common_1.Get)('/:id/address'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_q = typeof customer_dto_1.PaginationPaymentDto !== "undefined" && customer_dto_1.PaginationPaymentDto) === "function" ? _q : Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getAddress", null);
__decorate([
    (0, common_1.Put)('/information/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_r = typeof customer_dto_1.GeneralInformationDto !== "undefined" && customer_dto_1.GeneralInformationDto) === "function" ? _r : Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], CustomerController.prototype, "updateGeneralInformation", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)('/api/customer'),
    __metadata("design:paramtypes", [typeof (_a = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" ? _a : Object])
], CustomerController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e602815e1d80b4fd46a6")
/******/ })();
/******/ 
/******/ }
;