// mapper/service.mapper.ts

import { CreateServiceDto } from "../dtos/create-service.dto";


export const mapCreateService = (dto: CreateServiceDto, providerId: number) => {

  return dto.serviceMeta;
  // return {
  //   // title: dto.title,
  //   // description: dto.description,
  //   // image: dto.image ?? null,

  //   serviceMeta: {
  //     ...dto.serviceMeta,
  //     // slots: dto.slots,
  //     // createdBy: providerId,
  //     // createdAt: new Date(),
  //   },
  // };
};
