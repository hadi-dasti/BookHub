import { Router } from "express";

import { BookController } from "./controller/book.bokkhub.controller";

import { ValidateCreateBookInput, ValidateUpdateBookInput, ValidateBookIdParam } from "./validation/book.bookhub.validation";
import { AdminAuthMiddleware } from "./../admin/middleware/admin.bookhub.auth";

import { VerifyAccessTokenUser } from "./../user/middleware/user.bookhub.middleware";


const bookCotroller = new BookController();

const router: Router = Router();

router.post("/create", AdminAuthMiddleware, ValidateCreateBookInput, bookCotroller.createBook);
router.get("/getall-book", VerifyAccessTokenUser, bookCotroller.getAllBooks);
router.get("/get-one-book/:bookId",VerifyAccessTokenUser, ValidateBookIdParam, bookCotroller.getOneBook);
router.put("/update-book/:bookId", AdminAuthMiddleware, ValidateUpdateBookInput, bookCotroller.updateBook);
router.delete("/delete-book/:bookId", AdminAuthMiddleware, ValidateBookIdParam, bookCotroller.deletBook);

export default router;
