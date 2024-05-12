import { Request, Response, Router } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.download("./src/swagger.json");
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;
