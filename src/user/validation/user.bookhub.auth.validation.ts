import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Define validate gender
enum Gender {
  Male = "MALE",
  Female = "FEMALE",
}

export const validateSignupInput = (req: Request, res: Response, next: NextFunction) => {
    
  const userSchema = Joi.object({
    fullName: Joi.string().min(3).max(10).required().messages({
      "string.alphanum": "fullName must only contain alpha-numeric characters",
      "string.min": "fullName must be at least {{#limit}} characters long",
      "string.max": "fullName cannot be longer than {{#limit}} characters",
      "any.required": "fullName is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .messages({
        "string.pattern.base":
          "Password must be between 8 and 30 characters and contain only alpha-numeric characters",
      }),
    nationalCode: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base": "National code must be exactly 10 digits",
        "any.required": "National code is required",
      }),
    gender: Joi.string()
      .valid(...Object.values(Gender))
      .required()
      .messages({
        "any.only": "Please provide a valid gender",
        "any.required": "Gender is required",
      }),
  });

  //define handel error for req.body of signup user
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: true });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        messages: errors.join(","),
      });
    }
      return next();
      
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error" + err.message,
    });
  }
};


export const validateLoginInput = (req: Request, res: Response, next: NextFunction)=>{
  const userSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .messages({
        "string.pattern.base":
          "Password must be between 8 and 30 characters and contain only alpha-numeric characters",
      }),
  });
  //define handel error for req.body of login user
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        messages: errors.join(","),
      });
    }
      return next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error" + err.message,
    });
  }
}
