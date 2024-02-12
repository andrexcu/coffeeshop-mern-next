import { Router } from "express";
import { productsRouter } from "./productRoute";
import { usersRouter } from "./userRoute";
import { authRouter } from "./authRoute";

const router = Router();

router.use("/api/products", productsRouter);
router.use("/api/users", usersRouter);
router.use("/api/auth", authRouter);
export default router;
