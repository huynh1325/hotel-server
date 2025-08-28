import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './rooms/rooms.module';
import { BookingModule } from './booking/booking.module';
import { InvoicesModule } from './invoices/invoices.module';
import { RoomtypeModule } from './roomtype/roomtype.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { OrderdetailModule } from './orderdetail/orderdetail.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    RoomsModule,
    BookingModule,
    InvoicesModule,
    RoomtypeModule,
    MenuModule,
    OrderModule,
    OrderdetailModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
