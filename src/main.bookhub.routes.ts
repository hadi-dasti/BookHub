import { Router } from "express";

import userBookHubRouter from './user/user.bookhub.router';
import bookBookHubRouter from './book/book.bookhub.router';
import orderBookHubRouter from './order-book/orderbook.bookhub.router';
import adminBookHubRouter from './admin/admin.bookhub.router';

// Create an instance of the Express router
const router: Router = Router();

router.use('/user', userBookHubRouter);

router.use('/book', bookBookHubRouter);

router.use('/book-order', orderBookHubRouter);

router.use('/admin', adminBookHubRouter);


export default router;