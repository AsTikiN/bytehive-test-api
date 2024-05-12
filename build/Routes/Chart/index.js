"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ChartController_1 = require("../../controllers/ChartController");
var router = (0, express_1.Router)();
router.get("/tours", ChartController_1.ChartController.tours);
router.get("/totalIncome", ChartController_1.ChartController.income);
router.get("/statistic", ChartController_1.ChartController.statistic);
exports.default = router;
