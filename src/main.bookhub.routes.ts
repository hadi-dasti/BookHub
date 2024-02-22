import { Router } from "express";

import userBookHubRouter from './user/user.bookhub.router';
import bookBookHubRouter from './book/book.bookhub.router';



// Create an instance of the Express router
const router: Router = Router();

router.use('/user', userBookHubRouter);

router.use('/book', bookBookHubRouter);


export default router;