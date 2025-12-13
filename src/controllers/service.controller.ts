import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { serviceService } from "../services/service.service";
import { CreateServiceDto } from "../dtos/create-service.dto";
import { validateBody } from "../middlewares/validate";
import { UpdateServiceDto } from "../dtos/update_service_dto";

export const createService = async (req: Request, res: Response) => {
  try {
      validateBody(CreateServiceDto);

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

    const created = await serviceService.updateService(serviceId,providerId, req.body);

    return ApiResponse.updated(res, "Service updated", created);
  } catch (err: any) {
    return ApiResponse.badRequest(res, err.message);
  }
};
