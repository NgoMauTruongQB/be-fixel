"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 28:
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CSVController = void 0;
const common_1 = __webpack_require__(6);
const csv_service_1 = __webpack_require__(29);
const express_1 = __webpack_require__(34);
let CSVController = class CSVController {
    constructor(csvService) {
        this.csvService = csvService;
    }
    async exportCustomerToCsv(res) {
        const customers = await this.csvService.writeCustomserCsvFile();
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=EXPORT_CUSTOMER.csv');
        res.flushHeaders();
        const csvData = this.convertDataToCSV(customers);
        res.write(csvData, 'utf-8');
        res.end();
    }
};
exports.CSVController = CSVController;
__decorate([
    (0, common_1.Get)('export_customer'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], CSVController.prototype, "exportCustomerToCsv", null);
exports.CSVController = CSVController = __decorate([
    (0, common_1.Controller)('/api/csv'),
    __metadata("design:paramtypes", [typeof (_a = typeof csv_service_1.CSVService !== "undefined" && csv_service_1.CSVService) === "function" ? _a : Object])
], CSVController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("74802a054e6918a67cc2")
/******/ })();
/******/ 
/******/ }
;