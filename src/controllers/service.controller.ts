import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { serviceService } from "../services/service.service";
import { CreateServiceDto } from "../dtos/create-service.dto";
import { validateBody } from "../middlewares/validate";

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
