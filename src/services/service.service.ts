import { Service } from "../entities/Service";
import { ServiceSlot } from "../entities/ServiceSlot";
import { CreateServiceDto } from "../dtos/create-service.dto";
import { AppDataSource } from "../config/ormconfig";

export class ServiceService {
  private serviceRepo = AppDataSource.getRepository(Service);
  private slotRepo = AppDataSource.getRepository(ServiceSlot);

  async createService(providerId: number, dto: CreateServiceDto) {

    console.log(dto.title,)
        console.log(dto.description,)

            console.log(dto.image,)
    // console.log(dto.serviceMeta,)

    const service = this.serviceRepo.create({
      title: dto.title,
      description: dto.description,
      image: dto.image,
     serviceMeta: dto.serviceMeta,
    //   provider: { id: providerId } as any
    });

    const savedService = await this.serviceRepo.save(service);

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
}

export const serviceService = new ServiceService();
