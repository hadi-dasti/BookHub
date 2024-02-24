import { Router } from "express";
import { OrderBookController } from "./controller/orderbook.bookhub.controller";

const orderBookController = new OrderBookController();

const router: Router = Router()

router.post("/build", orderBookController.buildOrderBook);
router.get("/show-order-book", orderBookController.getOrderBook);
router.put("/update-order-book/:orderBookId", orderBookController.updateOrderBook);
router.delete("/delete-order-book/:orderBookId", orderBookController.deleteOrderBook);


export default router;