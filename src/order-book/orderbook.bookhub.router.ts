import { Router } from "express";
import { OrderBookController } from "./controller/orderbook.bookhub.controller";
// Import validation middleware
import { ValidatCreateOrderBookInput, ValidatUpdateOrderBookInput, ValidatDeleteOrderBookIdInput } from "./validation/orderbook.bookhub.validation";
// Import user authentication middleware
import { VerifyAccessTokenUser } from "./../user/middleware/user.bookhub.middleware";



const orderBookController = new OrderBookController();

const router: Router = Router()

router.post("/build-book-order",VerifyAccessTokenUser, ValidatCreateOrderBookInput, orderBookController.buildOrderBook);
router.get("/show-book-order",VerifyAccessTokenUser, orderBookController.getOrderBook);
router.put("/update-order-book/:orderBookId",ValidatUpdateOrderBookInput, orderBookController.updateOrderBook);
router.delete("/delete-order-book/:orderBookId",ValidatDeleteOrderBookIdInput, orderBookController.deleteOrderBook);


export default router;