import { Request, Response, NextFunction } from "express";
import Joi from "joi";


export const validateUserRefreshTokenInput = (req: Request, res: Response, next: NextFunction) => {
    const refreshTokenSchema = Joi.object({
      userId: Joi.string().required().messages({
        "string.base": "Uesr ID must be a string",
        "string.empty": "User ID is required",
      }),
      refreshToken: Joi.string().required().valid(Joi.ref("userId")).messages({
        "string.base": "Refresh Token must be a string",
        "string.empty": "Refresh Token is required",
        "any.only": "Refresh Token must match User ID",
      }),
    });

    try {
      const { error } = refreshTokenSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({
          success: false,
          messages: errors.join(","),
        });
      }
        return next();
        
    } catch (err) {
        console.error("Error validating user refresh token input:", err);
      return res.status(500).json({
        success: false,
        msg: "Internal Server Error"
      });
    }
};

export const validateUserLogout = (req: Request, res: Response, next: NextFunction) => {
    
    const logoutUserSchema = Joi.object({
        userId: Joi.string().required().messages({
            "string.base": "Uesr ID must be a string",
            "string.empty": "User ID is required",
        }),
    });
    
    try {
        const { error } = logoutUserSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).json({
                success: false,
                messages: errors.join(","),
            });
        }
        return next();
    } catch (err) {
        console.error("Error validating user logout:", err);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });
    }
};