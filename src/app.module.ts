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
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';

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
    FileModule,
    AuthModule
  ],
  controllers: [AppController],
    providers: [
    AppService,
      {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
      },
  ],
})
export class AppModule {}
