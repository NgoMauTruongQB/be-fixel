"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 24:
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
var _a, _b, _c, _d, _e, _f, _g, _h;
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
    async getGeneralInformation(id) {
        try {
            const data = await this.fixelistService.getGeneralInformation(id);
            return new globalClass_1.ResponseData(data, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async getJobs(id, paginationDto) {
        try {
            const job = await this.fixelistService.getJob(id, paginationDto);
            return new globalClass_1.ResponseData(job, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR);
        }
    }
    async getReviews(id, paginationDto) {
        try {
            const reviews = await this.fixelistService.getReviews(id, paginationDto);
            return new globalClass_1.ResponseData(reviews, globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS);
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
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], FixelistController.prototype, "getGeneralInformation", null);
__decorate([
    (0, common_1.Get)('/:id/job'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof fixelist_dto_1.PaginationDto !== "undefined" && fixelist_dto_1.PaginationDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], FixelistController.prototype, "getJobs", null);
__decorate([
    (0, common_1.Get)('/:id/reviews'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof fixelist_dto_1.PaginationDto !== "undefined" && fixelist_dto_1.PaginationDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], FixelistController.prototype, "getReviews", null);
exports.FixelistController = FixelistController = __decorate([
    (0, common_1.Controller)('/api/fixelist'),
    __metadata("design:paramtypes", [typeof (_a = typeof fixelist_service_1.FixelistService !== "undefined" && fixelist_service_1.FixelistService) === "function" ? _a : Object])
], FixelistController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5329c2cc1bc0e10169b6")
/******/ })();
/******/ 
/******/ }
;