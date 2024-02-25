import { Request, Response, NextFunction } from "express";
import Joi from "joi";

enum Status{
    pending = "pending",
    confirmed = "confirmed",
    shipped = "shipped",
    delivered="delivered"
}


export const ValidatCreateOrderBookInput = (req:Request,res:Response,next:NextFunction) => {
    const orderBookSchema = Joi.object({
      userId: Joi.string().alphanum().length(24).required().messages({
        "string.base": "userId must be a string",
        "string.alphaNum": "userid must only contain alphanumeric characters",
        "string.length": "userId must be exactly 24 characters long",
        "any.required": "user is required",
      }),
      bookId: Joi.string().alphanum().length(24).required().messages({
        "string.base": "bookId must be a string",
        "string.alphaNum": "bookid must only contain alphanumeric characters",
        "string.length": "bookId must be exactly 24 characters long",
        "any.required": "book is required",
      }),
      quantity: Joi.number().required().messages({
        "number.base": "Quantity must be a number",
        "any.required": "Quantity is required",
      }),
      totalPrice: Joi.number().required().messages({
        "number.base": "Total price must be a number",
        "any.required": "Total price is required",
      }),
      status: Joi.string()
        .valid(...Object.values(Status))
        .required()
        .messages({
          "any.only": "Please provide a valid genre",
          "any.required": "Status is required",
        }),
    });

    try {
        const { error } = orderBookSchema.validate({ ...req.body }, { abortEarly: false });
        if(error){
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).json({
                success: false,
                msg: errors.join(',')
            });
        }
        return next()
    } catch (err) {
        return res.status(500).json({
            sucess: false,
            msg: "Intreal Server Errro"
        });
    }
}

export const ValidatUpdateOrderBookInput = (req: Request, res: Response, next: NextFunction) => {

    const orderBookSchema = Joi.object({
      orderBookId: Joi.string().alphanum().length(24).required().messages({
        "string.base": "orderBookId must be a string",
        "string.alphaNum":
          "orderBookId must only contain alphanumeric characters",
        "string.length": "orderBookId must be exactly 24 characters long",
        "any.required": "orderBookId is required",
      }),
      userId: Joi.string().alphanum().length(24).required().messages({
        "string.base": "userId must be a string",
        "string.alphaNum": "userid must only contain alphanumeric characters",
        "string.length": "userId must be exactly 24 characters long",
        "any.required": "user is required",
      }),
      bookId: Joi.string().alphanum().length(24).required().messages({
        "string.base": "bookId must be a string",
        "string.alphaNum": "bookid must only contain alphanumeric characters",
        "string.length": "bookId must be exactly 24 characters long",
        "any.required": "book is required",
      }),
      quantity: Joi.number().required().messages({}),
      totalPrice: Joi.number().required().messages({}),
      status: Joi.string()
        .valid(...Object.values(Status))
        .required()
        .messages({
          "any.only": "Please provide a valid genre",
          "any.required": "Status is required",
        }),
    });
    try {
        const { error } = orderBookSchema.validate({ ...req.params, ...req.body }, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).json({
                sucess: false,
                msg: errors.join(',')
            });
        }
        return next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg:"Internal Server Error"
        })
    }
};

export const ValidatDeleteOrderBookIdInput = (req:Request,res:Response,next:NextFunction) => {
    const orderBookSchema = Joi.object({
      orderBookId: Joi.string().alphanum().length(24).required().messages({
        "string.base": "orderBookId must be a string",
        "string.alphaNum":
          "orderBookId must only contain alphanumeric characters",
        "string.length": "orderBookId must be exactly 24 characters long",
        "any.required": "orderBookId is required",
      }),
      userId: Joi.string().alphanum().length(24).required().messages({
        "string.base": "userId must be a string",
        "string.alphaNum": "userid must only contain alphanumeric characters",
        "string.length": "userId must be exactly 24 characters long",
        "any.required": "user is required",
      }),
    });
    try {
      const { error } = orderBookSchema.validate({ ...req.body, ...req.params });
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({
          sucess: false,
          msg: errors.join(","),
        });
      }
      return next();
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: "Internal Server Error",
      });
    }
}