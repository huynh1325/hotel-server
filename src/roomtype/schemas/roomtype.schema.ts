import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoomtypeDocument = HydratedDocument<Roomtype>;

@Schema({ timestamps: true })
export class Roomtype {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: [
      {
        bookingType: { type: String, enum: ['hourly', 'daily', 'overnight'], required: true },
        price: { type: Number, required: true },
      },
    ],
    default: [],
  })
  basePricing: {
    bookingType: 'hourly' | 'daily' | 'overnight';
    price: number;
  }[];

  @Prop({ type: Number, default: 0 })
  lateFee: number;
}

export const RoomtypeSchema = SchemaFactory.createForClass(Roomtype);
