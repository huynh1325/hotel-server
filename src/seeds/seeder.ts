import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument, RoomSchema } from '@/rooms/schemas/room.schema';
import { Roomtype, RoomtypeDocument, RoomtypeSchema } from '@/roomtype/schemas/roomtype.schema';
import { Injectable, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Injectable()
class Seeder {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(Roomtype.name) private roomTypeModel: Model<RoomtypeDocument>,
  ) {}

  async seed() {
    await this.roomModel.deleteMany({});
    await this.roomTypeModel.deleteMany({});

    const roomTypes = await this.roomTypeModel.insertMany([
      {
        name: 'Đơn (quạt)',
        description: 'Phòng đơn sử dụng quạt',
        basePricing: [
          { bookingType: 'daily', price: 180000 },
          { bookingType: 'overnight', price: 120000 },
          { bookingType: 'hourly', price: 60000 },
        ],
        lateFee: 30000,
      },
      {
        name: 'Đơn (điều hòa)',
        description: 'Phòng đơn sử dụng điều hòa',
        basePricing: [
          { bookingType: 'daily', price: 280000 },
          { bookingType: 'overnight', price: 220000 },
          { bookingType: 'hourly', price: 90000 },
        ],
        lateFee: 30000,
      },
      {
        name: 'Đôi nhỏ',
        description: 'Phòng đôi nhỏ',
        basePricing: [
          { bookingType: 'daily', price: 320000 },
          { bookingType: 'overnight', price: 280000 },
          { bookingType: 'hourly', price: 90000 },
        ],
        lateFee: 30000,
      },
      {
        name: 'Đôi lớn',
        description: 'Phòng đôi lớn',
        basePricing: [
          { bookingType: 'daily', price: 380000 },
          { bookingType: 'overnight', price: 350000 },
          { bookingType: 'hourly', price: 90000 },
        ],
        lateFee: 30000,
      },
    ]);

    const typeMap: Record<string, any> = {};
    for (const t of roomTypes) {
      typeMap[t.name] = t._id;
    }

    const rooms: {
      roomNumber: string;
      floor: number;
      status: string;
      roomType: any[];
    }[] = [];

    // Tầng trệt
    rooms.push({
      roomNumber: '002',
      floor: 0,
      status: 'available',
      roomType: [typeMap['Đơn (quạt)']],
    });
    rooms.push({
      roomNumber: '004',
      floor: 0,
      status: 'available',
      roomType: [typeMap['Đơn (điều hòa)']],
    });

    // Tầng 1
    rooms.push({
      roomNumber: '102',
      floor: 1,
      status: 'available',
      roomType: [typeMap['Đôi nhỏ']],
    });
    rooms.push({
      roomNumber: '103',
      floor: 1,
      status: 'available',
      roomType: [typeMap['Đơn (điều hòa)']],
    });
    rooms.push({
      roomNumber: '104',
      floor: 1,
      status: 'available',
      roomType: [typeMap['Đơn (điều hòa)']],
    });
    rooms.push({
      roomNumber: '105',
      floor: 1,
      status: 'available',
      roomType: [typeMap['Đơn (điều hòa)']],
    });
    rooms.push({
      roomNumber: '106',
      floor: 1,
      status: 'available',
      roomType: [typeMap['Đơn (điều hòa)']],
    });

    // Tầng 2
    rooms.push({
      roomNumber: '201',
      floor: 2,
      status: 'available',
      roomType: [typeMap['Đôi lớn']],
    });
    rooms.push({
      roomNumber: '202',
      floor: 2,
      status: 'available',
      roomType: [typeMap['Đôi nhỏ']],
    });
    rooms.push({
      roomNumber: '203',
      floor: 2,
      status: 'available',
      roomType: [typeMap['Đơn (quạt)'], typeMap['Đơn (điều hòa)']],
    });
    rooms.push({
      roomNumber: '204',
      floor: 2,
      status: 'available',
      roomType: [typeMap['Đơn (quạt)'], typeMap['Đơn (điều hòa)']],
    });
    rooms.push({
      roomNumber: '205',
      floor: 2,
      status: 'available',
      roomType: [typeMap['Đơn (quạt)'], typeMap['Đơn (điều hòa)']],
    });
    rooms.push({
      roomNumber: '206',
      floor: 2,
      status: 'available',
      roomType: [typeMap['Đơn (quạt)'], typeMap['Đơn (điều hòa)']],
    });

    // Tầng 3
    rooms.push({
      roomNumber: '301',
      floor: 3,
      status: 'available',
      roomType: [typeMap['Đôi lớn']],
    });
    rooms.push({
      roomNumber: '302',
      floor: 3,
      status: 'available',
      roomType: [typeMap['Đôi nhỏ']],
    });
    rooms.push({
      roomNumber: '303',
      floor: 3,
      status: 'available',
      roomType: [typeMap['Đơn (quạt)'], typeMap['Đơn (điều hòa)']],
    });
    rooms.push({
      roomNumber: '304',
      floor: 3,
      status: 'available',
      roomType: [typeMap['Đơn (điều hòa)']],
    });
    rooms.push({
      roomNumber: '305',
      floor: 3,
      status: 'available',
      roomType: [typeMap['Đơn (điều hòa)']],
    });
    rooms.push({
      roomNumber: '306',
      floor: 3,
      status: 'available',
      roomType: [typeMap['Đơn (điều hòa)']],
    });

    // Tầng 4
    rooms.push({
      roomNumber: '401',
      floor: 4,
      status: 'available',
      roomType: [typeMap['Đôi lớn']],
    });
    rooms.push({
      roomNumber: '402',
      floor: 4,
      status: 'available',
      roomType: [typeMap['Đôi nhỏ']],
    });
    rooms.push({
      roomNumber: '403',
      floor: 4,
      status: 'available',
      roomType: [typeMap['Đơn (điều hòa)']],
    });

    await this.roomModel.insertMany(rooms);
    console.log('Seeded thành công!');
  }
}

@Module({
  imports: [
    AppModule,
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Roomtype.name, schema: RoomtypeSchema },
    ]),
  ],
  providers: [Seeder],
})
class SeederModule {}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(Seeder);
  await seeder.seed();
  await app.close();
}

bootstrap();

// npx ts-node -r tsconfig-paths/register src/seeds/seeder.ts
