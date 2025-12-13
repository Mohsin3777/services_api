import { Service } from "../entities/Service";
import { ServiceSlot } from "../entities/ServiceSlot";
import { CreateServiceDto } from "../dtos/create-service.dto";
import { AppDataSource } from "../config/ormconfig";
import { mapCreateService } from "./service.mapper";
import { UpdateServiceDto } from "../dtos/update_service_dto";




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
      price:dto.price,
      
    serviceMeta: mapped ,
    //  serviceMeta: dto.serviceMeta ? )JSON.stringify(dto.serviceMeta : null,
      provider: { id: providerId } as any
    });

    const savedService = await this.serviceRepo.save(service);
console.log("SERVCE" +mapped)

    // create slots
    const slotEntities = dto.slots.map(s => {
      return this.slotRepo.create({
        day: s.day,
        startTime: s.startTime,
        endTime: s.endTime,
        slotDate:s.slotDate,
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
         //   .leftJoinAndSelect("service.provider", "provider")

  .addSelect("service.serviceMeta")   // ← required
        .where("service.id = :id", { id: serviceId })
        .getOne();

        console.log(service)
        return service
  }





  async updateService(
    serviceId: number,
    providerId: number,
    dto: UpdateServiceDto
  ) {
    return AppDataSource.transaction(async manager => {
      const serviceRepo = manager.getRepository(Service);
      const slotRepo = manager.getRepository(ServiceSlot);

      // 1️⃣ Load service
      const service = await serviceRepo
        .createQueryBuilder("service")
        .addSelect("service.serviceMeta")
        .leftJoinAndSelect("service.slots", "slots")
        .where("service.id = :id", { id: serviceId })
        .andWhere("service.providerId = :providerId", { providerId })
        .getOne();

      if (!service) {
        throw new Error("Service not found or unauthorized");
      }

      // 2️⃣ Update fields
      if (dto.title !== undefined) service.title = dto.title;
      if (dto.description !== undefined) service.description = dto.description;
      if (dto.image !== undefined) service.image = dto.image;
      if (dto.isActive !== undefined) service.isActive = dto.isActive;
      if (dto.price !== undefined) service.price = dto.price;

      // 3️⃣ Merge serviceMeta
      if (dto.serviceMeta) {
        service.serviceMeta = {
          ...(service.serviceMeta ?? {}),
          ...dto.serviceMeta,
        };
      }

      // 4️⃣ Update slots
      // if (dto.slots) {
      //   await slotRepo.delete({
      //     service: { id: serviceId },
      //   });

      //   const newSlots = dto.slots.map(s =>
      //     slotRepo.create({
      //       day: s.day,
      //       startTime: s.startTime,
      //       endTime: s.endTime,
      //       slotDate: s.slotDate,
      //     service: service,
      //     })
      //   );

      //   await slotRepo.save(newSlots);
      // }


// 4️⃣ Update slots (SMART UPDATE)
if (dto.slots) {
  const existingSlots = service.slots;

  // incoming slot IDs
  const incomingIds = dto.slots
    .filter(s => s.id)
    .map(s => s.id);

  // OPTIONAL: delete removed slots
  const toDelete = existingSlots.filter(
    slot => !incomingIds.includes(slot.id)
  );

  if (toDelete.length) {
    await slotRepo.remove(toDelete);
  }

  for (const s of dto.slots) {
    if (s.id) {
console.log(`HEEE ${s.isAvailable}`)
if(s.isAvailable===false){

        throw new Error("Cant Update Booked Slot");
        
}

      // 🔵 UPDATE EXISTING SLOT
      await slotRepo.update(
        { id: s.id },
        {
          day: s.day,
          startTime: s.startTime,
          endTime: s.endTime,
          slotDate: s.slotDate,
        }
      );
    } else {
      // 🟢 CREATE NEW SLOT
      const newSlot = slotRepo.create({
        day: s.day,
        startTime: s.startTime,
        endTime: s.endTime,
        slotDate: s.slotDate,
        isAvailable: true,      // 👈 REQUIRED
        service: service,       // 👈 REAL ENTITY
      });

      await slotRepo.save(newSlot);
    }
  }
}



      // 5️⃣ Save service
    //  await serviceRepo.save(service);

      // 6️⃣ Return updated service
      return serviceRepo
        .createQueryBuilder("service")
        .leftJoinAndSelect("service.slots", "slots")
        .addSelect("service.serviceMeta")
        .where("service.id = :id", { id: serviceId })
        .getOne();
    });
  }
}

export const serviceService = new ServiceService();
