import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument, RoomSchema } from '@/rooms/schemas/room.schema';
import { Injectable, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Injectable()
class Seeder {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async seed() {
    const count = await this.roomModel.countDocuments();
    if (count === 0) {
      const rooms = [] as { roomNumber: string; floor: number; status: string }[];

      for (let i = 101; i <= 110; i++) {
        rooms.push({ roomNumber: i.toString(), floor: 1, status: 'available' });
      }

      for (let i = 201; i <= 210; i++) {
        rooms.push({ roomNumber: i.toString(), floor: 2, status: 'available' });
      }

      for (let i = 301; i <= 305; i++) {
        rooms.push({ roomNumber: i.toString(), floor: 3, status: 'available' });
      }

      await this.roomModel.insertMany(rooms);
      console.log('✅ Seeded rooms successfully!');
    } else {
      console.log('⚠️ Rooms already exist, skipping seeding.');
    }
  }
}

@Module({
  imports: [
    AppModule,
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
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
