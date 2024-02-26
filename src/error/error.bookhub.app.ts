import { Request, Response, NextFunction } from "express";

interface httpError extends Error {
  status: number;
  statusText: string;
}

export const error = {
  errorHandle(err: httpError, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500);
    res.json({
      status: err.status,
      message: err.message || err.statusText || "somthing went wrong!",
    });
  },
};
