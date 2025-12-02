import { Service } from "../entities/Service";
import { ServiceSlot } from "../entities/ServiceSlot";
import { CreateServiceDto } from "../dtos/create-service.dto";
import { AppDataSource } from "../config/ormconfig";
import { mapCreateService } from "./service.mapper";

export class ServiceService {
  private serviceRepo = AppDataSource.getRepository(Service);
  private slotRepo = AppDataSource.getRepository(ServiceSlot);

  async createService(providerId: number, dto: CreateServiceDto) {

    console.log(dto.title,)
        console.log(dto.description,)

            console.log(dto.image,)
    // console.log(dto.serviceMeta,)

  const mapped = mapCreateService(dto,providerId);

console.log(mapped)

  // return;
    const service = this.serviceRepo.create({
      title: dto.title,
      description: dto.description,
      image: dto.image,
      
     serviceMeta: mapped ,
    //  serviceMeta: dto.serviceMeta ? )JSON.stringify(dto.serviceMeta : null,
      provider: { id: providerId } as any
    });

    const savedService = await this.serviceRepo.save(service);
console.log("SERVCE" +dto.serviceMeta)

    // create slots
    const slotEntities = dto.slots.map(s => {
      return this.slotRepo.create({
        day: s.day,
        startTime: s.startTime,
        endTime: s.endTime,
        service: savedService
      });
    });

    await this.slotRepo.save(slotEntities);

    return this.serviceRepo.findOne({
      where: { id: savedService.id },
      relations: ["slots"]
    });
  }



  async getService(serviceId: number){
    console.log("GetSerice")
//  return   this.serviceRepo.findOne({
//       where: { id: serviceId },
      
//       relations: ["slots"]
//     });

   const service = await this.serviceRepo
        .createQueryBuilder("service")
        .leftJoinAndSelect("service.slots", "slots")
        .addSelect("service.serviceMeta") // Explicitly select JSON column
        .where("service.id = :id", { id: serviceId })
        .getOne();

        console.log(service)
        return service
  }
}

export const serviceService = new ServiceService();
