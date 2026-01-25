import { userService } from "../services/user.service";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { buildPaginationResponse, parsePagination } from "../utils/pagination";
import { validateBody } from "../middlewares/validate";
import {  UserDto, UserRole } from "../dtos/user.dto";
import { UpdateUserDto } from "../dtos/update_user.dto";
import { AuthRequest } from "../interface/auth_requent_interface";



export const registerUser = [
  validateBody(UserDto),
  async (req: Request, res: Response) => {
    try {
      const result = await userService.register(req.body);
      return ApiResponse.created(res, "User created", result);
    } catch (err: any) {
      // Provide clear error messages
      return ApiResponse.badRequest(res, err.message || "Registration failed");
    }
  }
];
// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const user = await userService.register(req.body);
//     return ApiResponse.created(res, "User created", user);
//   } catch (error: any) {
//     return ApiResponse.badRequest(res, error.message);
//   }
// };


export const loginUser = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;

  if (!email || !password) {
   

  return ApiResponse.badRequest(res, 'Email and password are required.');

    }



    const user = await userService.login(email,password);
    return ApiResponse.created(res, "Success", user);
  } catch (error: any) {
    return ApiResponse.badRequest(res, error.message);
  }
};


export const getUsers = async (_req: Request, res: Response) => {
  try {
        const { page, limit, sortBy, order, offset } = parsePagination(_req.query);
            const { data, total } = await userService.getAll({ offset, limit, sortBy, order, page });
    return ApiResponse.success(res, buildPaginationResponse(data, page, limit, total));


    
  } catch (error) {
    return ApiResponse.error(res, "Server error", error);
  }
};



export const updateUser = [
  
  async (req: Request, res: Response) => {
    try {

      
      const id = Number(req.params.id);
      if (isNaN(id)) return ApiResponse.badRequest(res, "Invalid user ID");
// console.log(req.body)
      const updated = await userService.update(id, req.body);
      return ApiResponse.success(res, updated);

    } catch (err: any) {
      const msg = err.message || "Update failed";

      if (/not found/i.test(msg)) {
        return ApiResponse.badRequest(res, msg);
      }

      return ApiResponse.badRequest(res, msg);
    }
  }
];

export const getUserWithId = async(req: AuthRequest, res: Response)=>{
          try {
              var userId = Number(req.user?.id);

console.log(userId)
var user= await userService.getUserWithId(userId);

return ApiResponse.success(res,user)
          } catch (error) {
                return ApiResponse.error(res, " error", error);

          }
}





export const blockUnBlockUser = [
  
  async (req: AuthRequest, res: Response) => {
    try {
  if(req.user?.role != UserRole.ADMIN){
         return   ApiResponse.badRequest(res,"Only Admin can block user");
          }
console.log(req.params.id)
      const id = Number(req.params.id);
      if (isNaN(id)) return ApiResponse.badRequest(res, "Invalid user ID");

      const updated = await userService.blockUnBlockUser(id, req.body);
      return ApiResponse.success(res, updated);

    } catch (err: any) {
      const msg = err.message || "Update failed";

      if (/not found/i.test(msg)) {
        return ApiResponse.badRequest(res, msg);
      }

      return ApiResponse.badRequest(res, msg);
    }
  }
];
