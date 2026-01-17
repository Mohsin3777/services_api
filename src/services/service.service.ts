import { Service } from "../entities/Service";
import { ServiceSlot } from "../entities/ServiceSlot";
import { CreateServiceDto, SlotDto } from "../dtos/create-service.dto";
import { AppDataSource } from "../config/ormconfig";
import { mapCreateService } from "./service.mapper";
import { UpdateServiceDto, UpdateSlotDto } from "../dtos/update_service_dto";




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
        .addSelect("slots.isAvailable")

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

    console.log(dto.slots)
// 4️⃣ Update slots (SMART UPDATE)
if (dto.slots) {


  const existingSlots = service.slots;

  // incoming slot IDs
  const incomingIds = dto.slots
    .filter(s => s.id)
    .map(s => s.id);

  // OPTIONAL: delete removed slots
  // const toDelete = existingSlots.filter(
  //   slot => !incomingIds.includes(slot.id)
  // );

  // if (toDelete.length) {
  //   await slotRepo.remove(toDelete);
  // }


  for (const slot of existingSlots) {
  if (!incomingIds.includes(slot.id)) {
    await slotRepo.update(slot.id, {
      status: "CANCELLED",
      isAvailable: false,
    });
  }
}

for (const s of dto.slots) {
  if (s.id) {
    const dbSlot = service.slots.find(slot => slot.id === s.id);

    if (!dbSlot) {
      throw new Error("Slot not found");
    }

    // 🔒 HARD LOCK
    if (dbSlot.isAvailable === false) {
      throw new Error("Cannot update a booked slot");
    }

    await slotRepo.update(
      { id: s.id },
      {
        day: s.day,
        startTime: s.startTime,
        endTime: s.endTime,
        slotDate: s.slotDate,
         status: "MODIFIED",
      }
    );
  } else {
    // 🟢 NEW SLOT
    const newSlot = slotRepo.create({
      day: s.day,
      startTime: s.startTime,
      endTime: s.endTime,
      slotDate: s.slotDate,
      isAvailable: true,
      service: service,
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



  async updateServiceInfo(
  // manager: EntityManager,
  serviceId: number,
      providerId: number,

  dto: UpdateServiceDto
) {

const service = await this.serviceRepo
        .createQueryBuilder("service")
        .addSelect("service.serviceMeta")
        .leftJoinAndSelect("service.slots", "slots")
        .addSelect("slots.isAvailable")

        .where("service.id = :id", { id: serviceId })
        .andWhere("service.providerId = :providerId", { providerId })
        .getOne();

      if (!service) {
        throw new Error("Service not found or unauthorized");
      }



  if (dto.title !== undefined) service.title = dto.title;
  if (dto.description !== undefined) service.description = dto.description;
  if (dto.image !== undefined) service.image = dto.image;
  if (dto.isActive !== undefined) service.isActive = dto.isActive;
  if (dto.price !== undefined) service.price = dto.price;

  return this.serviceRepo.save(service);
}


async syncServiceSlots(
 // manager: EntityManager,
  service: Service,
  slotsDto: UpdateSlotDto[]
) {

  const existingSlots = service.slots;
  const incomingIds = slotsDto.filter(s => s.id).map(s => s.id);

  // 🔒 Cancel removed slots (NOT delete)
  for (const slot of existingSlots) {
    if (!incomingIds.includes(slot.id)) {
      await this.slotRepo.update(slot.id, {
        status: "CANCELLED",
        isAvailable: false,
      });
    }
  }

  // 🔁 Update or Create
  for (const s of slotsDto) {
    if (s.id) {
      await this.updateSlot( service, s);
    } else {
      await this.createSlot( service, s);
    }
  }
}
private async updateSlot(
  service: Service,
  dto: UpdateSlotDto
) {
  const slot = await this.slotRepo.findOne({
    where: { id: dto.id, service: { id: service.id } },
  });

  if (!slot) throw new Error("Slot not found");
  if (!slot.isAvailable) throw new Error("Booked slot cannot be modified");

  await this.slotRepo.update(slot.id, {
    day: dto.day,
    startTime: dto.startTime,
    endTime: dto.endTime,
    slotDate: dto.slotDate,
    status: "MODIFIED",
  });
}
private async createSlot(
  service: Service,
  dto: UpdateSlotDto
) {
  const slot = this.slotRepo.create({
    day: dto.day,
    startTime: dto.startTime,
    endTime: dto.endTime,
    slotDate: dto.slotDate,
    isAvailable: true,
    service,
  });

  await this.slotRepo.save(slot);
}




  async getServicesWithUserId({
  userId,
  limit,
  page,
  sortBy,
  order,
}: {
  userId: number;
  limit: number;
  page: number;
  sortBy: string;
  order: "ASC" | "DESC";
}) {
  const take = limit;
  const skip = (page - 1) * limit;

  const [services, total] = await this.serviceRepo
    .createQueryBuilder("service")
    .leftJoinAndSelect("service.slots", "slots")

    // ✅ Join provider but select limited fields
    .leftJoin("service.provider", "provider")
    .addSelect([
      "provider.id",
      "provider.firstName",
      "provider.profileImage",
      "provider.role",
    ])

    // ✅ If serviceMeta is not eager
  //  .addSelect("service.serviceMeta")

    .where("provider.id = :id", { id: userId })

    // ✅ Sorting
    .orderBy(`service.${sortBy}`, order)

    // ✅ Pagination
    .skip(skip)
    .take(take)

    // ✅ Needed for pagination total count
    .getManyAndCount();
    return { services, total, page, limit };


}



//get random services



  async getRandomServicesList({
    search,
  limit,
  page,
  sortBy,
  order,
}: {
  search:string;
  limit: number;
  page: number;
  sortBy: string;
  order: "ASC" | "DESC";
}) {
  const take = limit;
  const skip = (page - 1) * limit;

  const [services, total] = await this.serviceRepo
    .createQueryBuilder("service")
    .leftJoinAndSelect("service.slots", "slots")

    // ✅ Join provider but select limited fields
    .leftJoin("service.provider", "provider")
    .addSelect([
      "provider.id",
      "provider.firstName",
      "provider.profileImage",
      "provider.role",
    ])

.where("provider.firstName LIKE :firstName", { firstName: `${search}%` })


    // ✅ Sorting
    .orderBy(`service.${sortBy}`, order)

    // ✅ Pagination
    .skip(skip)
    .take(take)

    // ✅ Needed for pagination total count
    .getManyAndCount();
    return { services, total, page, limit };


}


}

export const serviceService = new ServiceService();
