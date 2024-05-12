import { Router } from "express";
import { ChartController } from "../../controllers/ChartController";

const router = Router();

router.get("/tours", ChartController.tours);
router.get("/totalIncome", ChartController.income);
router.get("/statistic", ChartController.statistic);

export default router;