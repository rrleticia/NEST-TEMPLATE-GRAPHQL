import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { method, originalUrl } = req;
      const timestamp = new Date().toISOString();

      console.log(`[${timestamp}] ${method} ${originalUrl}`);

      next();
    } catch (error) {
      console.error("Error in LoggerMiddleware:", error);
      next(error);
    }
  }
}
