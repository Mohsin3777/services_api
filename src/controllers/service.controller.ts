import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { serviceService } from "../services/service.service";
import { CreateServiceDto } from "../dtos/create-service.dto";
import { validateBody } from "../middlewares/validate";
import { UpdateServiceDto } from "../dtos/update_service_dto";
import { AuthRequest } from "../middlewares/authMiddleware";
import { buildPaginationResponse, parsePagination } from "../utils/pagination";
import { UserRole } from "../dtos/user.dto";

export const createService = async (req: Request, res: Response) => {
  try {
      validateBody(CreateServiceDto);
if (req.body.role !== UserRole.PROVIDER) {
  return  ApiResponse.badRequest(res,"Only providers allowed");
}
    // const providerId = req.user.id; // assuming auth middleware
var providerId=Number(req.query.providerId)
    const created = await serviceService.createService(providerId, req.body);

    return ApiResponse.created(res, "Service created", created);
  } catch (err: any) {
    return ApiResponse.badRequest(res, err.message);
  }
};





export const getServiceById = async (req: Request, res: Response) => {
  try {
console.log("MOHSS")
    // const providerId = req.user.id; // assuming auth middleware
var serviceId=Number(req.query.serviceId)
    const service = await serviceService.getService(serviceId);

    return ApiResponse.success(res,  service);
  } catch (err: any) {
    return ApiResponse.badRequest(res, err.message);
  }
};




export const editService = async (req: Request, res: Response) => {
  try {
      validateBody(UpdateServiceDto);

    // const providerId = req.user.id; // assuming auth middleware
var providerId=Number(req.query.providerId)
var serviceId=Number(req.query.serviceId)

    // const created = await serviceService.updateService(serviceId,providerId, req.body);
        const created = await serviceService.updateServiceInfo(serviceId,providerId, req.body);


    return ApiResponse.updated(res, "Service updated", created);
  } catch (err: any) {
    return ApiResponse.badRequest(res, err.message);
  }
};






export const getServiceWithUserId = async (req: AuthRequest, res: Response) => {
  try {
console.log("MOHSS")
    // const providerId = req.user.id; // assuming auth middleware
var userId=Number(req.query.userId)
        const { page, limit, sortBy, order, offset } = parsePagination(req.query);

    const {services,total} = await serviceService.getServicesWithUserId({userId,  limit,page, sortBy, order});

    return ApiResponse.success(res, buildPaginationResponse(services, page, limit, total));
  } catch (err: any) {
    return ApiResponse.badRequest(res, err.message);
  }
};






export const getRandomServicesList = async (req: AuthRequest, res: Response) => {
  try {
    // const providerId = req.user.id; // assuming auth middleware
const search = String(req.query.search);
        const { page, limit, sortBy, order, offset, } = parsePagination(req.query);

    const {services,total} = await serviceService.getRandomServicesList({search, limit,page, sortBy, order});

    return ApiResponse.success(res, buildPaginationResponse(services, page, limit, total));
  } catch (err: any) {
    return ApiResponse.badRequest(res, err.message);
  }
};
