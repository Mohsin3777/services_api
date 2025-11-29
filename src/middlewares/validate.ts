import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

function formatErrors(errors: ValidationError[]): string[] {
  const out: string[] = [];
  errors.forEach(err => {
    if (err.constraints) out.push(...Object.values(err.constraints));
    if (err.children && err.children.length) out.push(...formatErrors(err.children));
  });
  return out;
}

export function validateBody(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: false });
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors: formatErrors(errors) });
    }
    req.body = dto; // transformed instance
    next();
  };
}
