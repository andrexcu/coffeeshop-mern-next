import { Router } from "express";
import { productsRouter } from "./productRoute";
import { usersRouter } from "./userRoute";
import { authRouter } from "./authRoute";
import { cartRouter } from "./cartRoute";
import { cartItemRouter } from "./cartItemRoute";

const router = Router();

router.use("/api/products", productsRouter);
router.use("/api/users", usersRouter);
router.use("/api/auth", authRouter);
router.use("/api/cart", cartRouter);
router.use("/api/cartItem", cartItemRouter);

router.get("/", (req, res) => {
  res.send("coffee shopmern api");
}); 
router.get("/api", (req, res) => {
  res.send("coffee shopmern api");
}); 

export default router;
