import { Request } from "express";
import { UserRole } from "../dtos/user.dto";


export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: UserRole;
  };
}
/*
🧩 The Problem in ONE Line

When you use AuthRequest → role works ❌ params error

When you use Request → params works ❌ role error

*/