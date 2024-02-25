import { Request, Response, NextFunction } from "express";
import Joi from "joi";

enum Genre {
  Fiction = "Fiction",
  NonFiction = "Non-Fiction",
  SciFi = "Sci-Fi",
  Mystery = "Mystery",
  Romance = "Romance",
}

export const ValidateCreateBookInput = (req: Request, res: Response, next: NextFunction) => {
    
  const bookSchema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title cannot be empty",
      "any.required": "Title is required",
    }),
    author: Joi.string().required().not().empty().messages({
      "string.empty": "Author cannot be empty",
      "any.required": "Author is required",
    }),
    genre: Joi.string()
      .valid(...Object.values(Genre))
      .required()
      .messages({
        "any.only": "Please provide a valid genre",
        "any.required": "Genre is required",
      }),
    description: Joi.string().required().messages({
      "string.empty": "Description cannot be empty",
      "any.required": "Description is required",
    }),
    countBook: Joi.number().min(0).default(1).messages({
      "number.min": "Count of books cannot be negative",
      "number.base": "Count of books must be a number",
    }),
  });
    try {
        const { error } = bookSchema.validate(req.body, { abortEarly: true });
        if (error) {
          const errors = error.details.map((detail) => detail.message);
            return res.status(400).json({
                success: false,
                msg: errors.join(","),
            });
        }
        return next()

    } catch (err) {
         return res.status(500).json({
           success: false,
           msg: "Internal Server Error" + err.message,
         });
    }   
};

export const ValidateBookIdParam = (req: Request,res: Response,next: NextFunction) => {
  const bookSchema = Joi.object({
    bookId: Joi.string().alphanum().length(24).required().messages({
      "string.base": "bookId must be a string",
      "string.alphaNum": "bookid must only contain alphanumeric characters",
      "string.length": "bookId must be exactly 24 characters long",
      "any.required": "book is required",
    }),
  });

  try {
    const { error } = bookSchema.validate(req.params, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
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
};

export const ValidateUpdateBookInput = (req: Request, res: Response, next: NextFunction) => {
    
    const bookSchema = Joi.object({
      bookId: Joi.string().alphanum().length(24).required().messages({
        "string.base": "bookId must be a string",
        "string.alphaNum": "bookid must only contain alphanumeric characters",
        "string.length": "bookId must be exactly 24 characters long",
        "any.required": "book is required",
      }),
    title: Joi.string().required().messages({
      "string.empty": "Title cannot be empty",
      "any.required": "Title is required",
    }),
    author: Joi.string().required().not().empty().messages({
      "string.empty": "Author cannot be empty",
      "any.required": "Author is required",
    }),
    genre: Joi.string()
      .valid(...Object.values(Genre))
      .required()
      .messages({
        "any.only": "Please provide a valid genre",
        "any.required": "Genre is required",
      }),
    description: Joi.string().required().messages({
      "string.empty": "Description cannot be empty",
      "any.required": "Description is required",
    }),
    countBook: Joi.number().min(0).default(1).messages({
      "number.min": "Count of books cannot be negative",
      "number.base": "Count of books must be a number",
    }),
    });
    
    try {

        const { error } = bookSchema.validate({ ...req.body, ...req.params }, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).json({
                success: false,
                msg : errors.join(",")
            })
        }
        return next();
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
}
