import { Router } from "express";
import { productsRouter } from "./productRoute";

const router = Router();

router.use("/api/products", productsRouter);

export default router;
