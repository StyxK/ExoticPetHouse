import {
  Injectable,
  Logger,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual, In } from 'typeorm';
import { OrderDTO } from './order.dto';
import { OrderLine } from '../orderline/orderline.entity';
import { Customer } from '../customer/customer.entity';
import { OrderStatus } from './order.status.entity';
import { Pet } from '../pet/pet.entity';
import * as moment from 'moment';
import { ChargeService } from '../charge/charge.service';
import { CustomerNotification } from '../notification/notification.customer.entity';
import { StoreNotification } from '../notification/notification.store.entity';
import { AppNotification } from '../app.gateway';
import { Store } from '../store/store.entity';
import { Cage } from '../cage/cage.entity';
import { CageType } from '../cage/cage.type.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderLine)
    private readonly orderLineRepository: Repository<OrderLine>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectRepository(CustomerNotification)
    private readonly customerNotification: Repository<CustomerNotification>,
    @InjectRepository(StoreNotification)
    private readonly storeNotification: Repository<StoreNotification>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    private chargeService: ChargeService,
    private gateway: AppNotification,
    @InjectRepository(Cage)
    private readonly cageRepository: Repository<Cage>,
    @InjectRepository(CageType)
    private readonly cageTypeRepository: Repository<CageType>,
  ) {}

  private toResponseObject(order: Order) {
    return { ...order, customer: order.customer.toResponObject(false) };
  }

  private ensureOwnership(order: Order, userName: string) {
    if (order.customerUsername !== userName) {
      throw new HttpException('Incorect User', HttpStatus.UNAUTHORIZED);
    }
  }

  async getAll() {
    const order = await this.orderRepository.find({
      relations: [
        'store',
        'orderStatus',
        'orderLines',
        'orderLines.pet',
        'orderLines.cage',
      ],
    });
    return order;
  }

  async showAll(userName: string): Promise<Order[]> {
    await Logger.log(userName);
    const orders = await this.orderRepository.find({
      where: { customerUsername: userName },
      relations: [
        'store',
        'orderStatus',
        'orderLines',
        'orderLines.pet',
        'orderLines.cage',
      ],
    });
    return orders;
  }

  async showOrderOfStore(storeId: string): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { storeId },
      relations: [
        'orderStatus',
        'orderLines',
        'orderLines.pet',
        'orderLines.cage',
      ],
    });
    return orders;
  }

  async showById(id: string) {
    const order = await this.orderRepository.findOne({
      where: id,
      relations: ['orderStatus', 'store'],
    });
    const orderLines = await this.orderLineRepository.find({
      relations: ['pet', 'cage'],
      where: { order: id },
    });
    let totalPrice: number = 0;
    let endDate;
    if (
      moment(order.endDate)
        .fromNow()
        .match('ago')
    ) {
      endDate = new Date();
    } else {
      endDate = order.endDate;
    }

    const duration = await this.calculateDate(order.startDate, endDate);
    for (let orderLine in orderLines) {
      const typeId = orderLines[orderLine].cage.cageTypeId;
      const data = await this.cageTypeRepository.findOne({
        where: { id: typeId },
        select: ['price'],
      });
      totalPrice += data.price * duration;
    }
    return {
      ...order,
      orderLines,
      totalPrice,
      warning: `ท่านได้ค้างชำระเป็นเวลา ${duration} วัน`,
    };
  }

  async delete(id: string) {
    await this.orderRepository.delete(id);
    return { delete: true };
  }

  async calculateDate(startDate: Date, endDate: Date) {
    const diffTime = await Math.abs(startDate.getTime() - endDate.getTime());
    return await Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  async getAllStatuses() {
    return await this.orderStatusRepository.find();
  }

  async getStatus(order) {
    const id = await order.orderId;
    return await this.orderRepository.findOne({
      where: { id: id },
      relations: ['orderStatus', 'orderLines'],
    });
  }

  async getCage(
    storeId: string,
    startDate: Date,
    endDate: Date,
    usedCages: string[],
    cageTypeId: String,
  ): Promise<Cage> {
    console.log(cageTypeId);
    const intersectOrders = await this.orderRepository.find({
      where: {
        storeId: storeId,
        endDate: MoreThanOrEqual(startDate),
        startDate: LessThanOrEqual(endDate),
        OrderStatus: In([1, 2, 3, 6, 7, 8, 9]),
      },
      relations: ['orderLines'],
    });
    const unavaCages: string[] = [];
    intersectOrders.forEach(order => {
      order.orderLines.forEach(orderLine => {
        unavaCages.push(orderLine.cageId);
      });
    });
    const cages = await this.cageRepository.find({
      where: {
        storeId: storeId,
        cageTypeId: cageTypeId,
      },
    });
    const avaCage = cages.find(
      cage => unavaCages.indexOf(cage.id) < 0 && usedCages.indexOf(cage.id) < 0,
    );
    return avaCage;
  }

  // route for manage order

  // createOrder --> สร้าง order รอร้านตอบรับ

  async create(userName: string, data: Partial<OrderDTO>) {
    try {
      console.log(data);
      const requestBody = JSON.parse(JSON.stringify(data));
      const cages: string[] = [];
      for (const orderLine of data.orderLines) {
        const cage = await this.getCage(
          requestBody.storeId,
          data.startDate,
          data.endDate,
          cages,
          (orderLine as any).cageType,
        );
        if (!cage) {
          throw new Error('ขออภัย ไม่มีกรงที่ว่างอยู่ในช่วงเวลาที่ท่านเลือก');
        }
        orderLine.cage = cage;
        cages.push(cage.id);
      }
      const storeId = requestBody.storeId;
      const store = await this.storeRepository.findOne({
        where: { id: storeId },
      });
      if (store.banned) {
        throw new Error(
          'ขออภัย ร้านดังกล่าวไม่สามารถฝากได้เนื่องจากกระทำผิดนโยบายของ exotic pet house',
        );
      }
      const user = await this.customerRepository.findOne({
        where: { userName: userName },
      });
      const checkPets = await data.orderLines.map(async result => {
        const pet = await this.petRepository.findOne({
          where: { id: result.pet },
        });
        if (pet.wasDeposit) {
          throw new Error('สัตว์เลี้ยงยังอยู่ในการฝาก');
        } else if (pet.deletedAt != null) {
          throw new Error('สัตว์เลี้ยงได้ถูกนำออกจากระบบแล้ว');
        } else {
          return 'nothing happend';
        }
      });
      await Promise.all(checkPets);
      await this.orderLineRepository.save(data.orderLines);
      const order = this.orderRepository.create({
        ...data,
        orderStatus: { id: 1 },
        customer: user,
      });
      await this.orderRepository.save(order);
      const orderBeforeUpdate = await this.orderRepository.findOne({
        where: { id: order.id },
        relations: ['orderStatus', 'store'],
      });
      await this.pushStoreNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.storeId,
      );
      await this.pushCustomerNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.customerUsername,
      );
      return this.toResponseObject(order);
    } catch (error) {
      if (
        error.message == 'ขออภัย ไม่มีกรงที่ว่างอยู่ในช่วงเวลาที่ท่านเลือก' ||
        error.message == 'สัตว์เลี้ยงยังอยู่ในการฝาก' ||
        error.message == 'สัตว์เลี้ยงได้ถูกนำออกจากระบบแล้ว' ||
        error.message ==
          'ขออภัย ร้านดังกล่าวไม่สามารถฝากได้เนื่องจากกระทำผิดนโยบายของ exotic pet house'
      ) {
        Logger.log(error.message);
        return new HttpException(error.message, 406);
      } else {
        Logger.log(error.message);
        return HttpStatus.INTERNAL_SERVER_ERROR;
      }
    }
  }

  // order acceptance by store --> ร้านตอบรับการฝาก
  async storeAcceptance(order) {
    try {
      const data = await this.getStatus(order);
      if ((await data.orderStatus.id) != 1) {
        throw new Error('ออเดอร์นี้ไม่ได้อยู่ในสถานะรอร้านตอบรับ');
      }
      this.orderRepository.update(data.id, { orderStatus: { id: 2 } });
      const orderBeforeUpdate = await this.orderRepository.findOne({
        where: { id: data.id },
        relations: ['orderStatus', 'store'],
      });
      await this.pushStoreNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.storeId,
      );
      await this.pushCustomerNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.customerUsername,
      );
    } catch (error) {
      if (error.message == 'ออเดอร์นี้ไม่ได้อยู่ในสถานะรอร้านตอบรับ')
        return new HttpException(error.message, 406);
      else return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  // deny order by customer --> ลูกค้ายกเลิกการฝาก
  async denyByCustomer(order) {
    try {
      const data = await this.getStatus(order);
      if (
        (await data.orderStatus.id) != 1 &&
        (await data.orderStatus.id) != 2
      ) {
        throw new Error('ออร์เดอร์นี้ไม่สามารถยกเลิกได้');
      }
      this.orderRepository.update(data.id, { orderStatus: { id: 4 } });
      const orderBeforeUpdate = await this.orderRepository.findOne({
        where: { id: data.id },
        relations: ['orderStatus', 'store'],
      });
      await this.pushStoreNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.storeId,
      );
      await this.pushCustomerNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.customerUsername,
      );
    } catch (error) {
      if (error.message == 'ออร์เดอร์นี้ไม่สามารถยกเลิกได้')
        return new HttpException(error.message, 406);
      else return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  // deny order by store  --> ลูกค้ายกเลิกการฝาก
  async denyByStore(order) {
    try {
      const data = await this.getStatus(order);
      if ((await data.orderStatus.id) != 1) {
        throw new Error('ออร์เดอร์นี้ไม่สามารถยกเลิกได้');
      }
      this.orderRepository.update(data.id, { orderStatus: { id: 5 } });
      const orderBeforeUpdate = await this.orderRepository.findOne({
        where: { id: data.id },
        relations: ['orderStatus', 'store'],
      });
      await this.pushStoreNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.storeId,
      );
      await this.pushCustomerNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.customerUsername,
      );
    } catch (error) {
      if (error.message == 'ออร์เดอร์นี้ไม่สามารถยกเลิกได้')
        return new HttpException(error.message, 406);
      else return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  // order Begin --> สัตว์เลี้ยงอยู่ระหว่างการฝาก
  async orderBegin(order) {
    try {
      const data = await this.getStatus(order);
      const orderLines = await this.orderLineRepository.find({
        where: { order: data.id },
        relations: ['pet'],
      });
      if ((await data.orderStatus.id) != 2) {
        throw new Error('ออเดอร์นี้ไม่ได้อยู่ในสถานะร้านตอบรับแล้ว');
      }
      await this.orderRepository.update(data.id, { orderStatus: { id: 3 } });
      const setPetWasDeposit = await orderLines.map(async pet => {
        await this.petRepository.update(pet.pet.id, { wasDeposit: true });
      });
      await Promise.all(setPetWasDeposit);
      const orderBeforeUpdate = await this.orderRepository.findOne({
        where: { id: data.id },
        relations: ['orderStatus', 'store'],
      });
      await this.pushStoreNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.storeId,
      );
      await this.pushCustomerNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.customerUsername,
      );
      return 'สัตว์เลี้ยงได้อยู่ในการรับฝากแล้ว';
    } catch (error) {
      return error.message;
    }
  }

  // order out of time   --> ออร์เดอร์หมดเวลาฝาก
  async outOfTime() {
    try {
      await this.orderRepository
        .createQueryBuilder()
        .update(`order`)
        .set({ orderStatus: { id: 6 } })
        .where(`endDate < :now`, { now: moment().utc() })
        .andWhere(`"order"."orderStatusId" = 3`)
        .execute();
      await this.orderRepository
        .createQueryBuilder()
        .update(`order`)
        .set({ orderStatus: { id: 5 } })
        .where(`startDate < :now`, { now: moment().utc() })
        .andWhere(`"order"."orderStatusId" = 1`)
        .execute();
      await this.orderRepository
        .createQueryBuilder()
        .update(`order`)
        .set({ orderStatus: { id: 4 } })
        .where(`startDate < :now`, { now: moment().utc() })
        .andWhere(`"order"."orderStatusId" = 2`)
        .execute();
      return await this.orderRepository.find();
    } catch (error) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  // charge order --> จ่ายค่าบริการ
  async charge(orderId, charge) {
    try {
      const data = await this.getStatus(orderId);
      if (data.orderStatus.id != 6 && data.orderStatus.id != 3) {
        throw new Error('ออเดอร์นี้ยังไม่หมดเวลาการฝาก');
      }
      let totalPrice: number = 0;
      const duration = await this.calculateDate(data.startDate, new Date());
      const calculatePrice = await data.orderLines.map(async result => {
        const orderLine = await this.orderLineRepository.findOne({
          where: { id: result.id },
          relations: ['cage'],
        });
        const cage = await this.cageRepository.findOne({where:{id:orderLine.cageId},relations:['cageType']})
        totalPrice += cage.cageType.price * duration;
      });
      await Promise.all(calculatePrice);
      await this.chargeService.chargeFromToken({
        token: charge.token,
        amount: totalPrice,
      });
      await this.orderRepository.update(data.id, { orderStatus: { id: 9 } });
      const orderBeforeUpdate = await this.orderRepository.findOne({
        where: { id: data.id },
        relations: ['orderStatus', 'store'],
      });
      await this.pushStoreNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.storeId,
      );
      await this.pushCustomerNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.customerUsername,
      );
    } catch (error) {
      console.log(error);
      if (error.message == 'ออเดอร์นี้ยังไม่หมดเวลาการฝาก')
        return new HttpException(error.message, 406);
      else return new HttpException(error.message, 500);
    }
  }

  // return Pets in order --> ร้านคืนสัตว์เลี้ยง
  async returnPetOrder(order) {
    try {
      const data = await this.getStatus(order);
      if (data.orderStatus.id != 9) {
        throw new Error('ออร์เดอร์นี้้ยังไม่ได้ชำระค่าบริการ');
      }
      await this.orderRepository.update(data.id, { orderStatus: { id: 8 } });
      const orderBeforeUpdate = await this.orderRepository.findOne({
        where: { id: data.id },
        relations: ['orderStatus', 'store'],
      });
      await this.pushStoreNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.storeId,
      );
      await this.pushCustomerNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.customerUsername,
      );
      return this.orderRepository.findOne({ id: data.id });
    } catch (error) {
      if (error.message == 'ออร์เดอร์นี้้ยังไม่ได้ชำระค่าบริการ')
        return new HttpException(error.message, 402);
      else return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  // get pets back --> เจ้าของรับสัตว์เลี้ยง
  async getPetsBack(order) {
    try {
      const data = await this.getStatus(order);
      if (data.orderStatus.id != 8) {
        throw new Error('กรุณาติดต่อร้านเพื่อรับสัตว์เลี้ยงคืน');
      }
      const pet = await data.orderLines.map(async data => {
        const petInOrderLine = await this.orderLineRepository.findOne({
          where: { id: data.id },
          relations: ['pet'],
        });
        await this.petRepository.update(petInOrderLine.pet.id, {
          wasDeposit: false,
        });
      });
      await Promise.all(await pet);
      await this.orderRepository.update(data.id, { orderStatus: { id: 7 } });
      const orderBeforeUpdate = await this.orderRepository.findOne({
        where: { id: data.id },
        relations: ['orderStatus', 'store'],
      });
      await this.pushStoreNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.storeId,
      );
      await this.pushCustomerNotification(
        orderBeforeUpdate,
        orderBeforeUpdate.customerUsername,
      );
      return await this.orderRepository.findOne({ where: { id: data.id } });
    } catch (error) {
      console.log(error);
      if (error.message == 'กรุณาติดต่อร้านเพื่อรับสัตว์เลี้ยงคืน')
        return new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      else return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async updateWasFeedBack(order) {
    try {
      const data = await this.getStatus(order);
      await this.orderRepository.update(data.id, { wasFeedBack: true });
    } catch (error) {
      console.log(error);
    }
  }

  //use by customer
  async pushStoreNotification(order: Partial<OrderDTO>, store) {
    this.storeNotification
      .createQueryBuilder()
      .insert()
      .into(StoreNotification)
      .values({
        message: JSON.stringify(order),
        millisec: moment().unix(),
        store: store,
        orderId: order.id,
      })
      .onConflict(
        `("orderId") DO UPDATE SET "message" = :message,"millisec" = :millisec`,
      )
      .setParameters({
        message: JSON.stringify(order),
        millisec: moment().unix(),
      })
      .execute();
    await this.gateway.wss.emit('storeNotification', {
      store: store,
      order: order,
    });
  }

  //use by store
  async pushCustomerNotification(order: Partial<OrderDTO>, customer) {
    this.customerNotification
      .createQueryBuilder()
      .insert()
      .into(CustomerNotification)
      .values({
        message: JSON.stringify(order),
        millisec: moment().unix(),
        customer: customer,
        orderId: order.id,
      })
      .onConflict(
        `("orderId") DO UPDATE SET "message" = :message,"millisec" = :millisec`,
      )
      .setParameters({
        message: JSON.stringify(order),
        millisec: moment().unix(),
      })
      .execute();
    // this.customerNotification.save({
    //     message: JSON.stringify(order),
    //     millisec: moment().unix(),
    //     customer:customer
    // })
    await this.gateway.wss.emit('customerNotification');
  }

  async outOfTimeNotification() {
    const order = await this.orderRepository
      .createQueryBuilder()
      .select()
      .where(`endDate < :now`, { now: moment().utc() })
      .andWhere(`"order"."orderStatusId" = 6`)
      .execute();
  }
}
