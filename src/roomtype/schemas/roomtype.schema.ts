import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoomtypeDocument = HydratedDocument<Roomtype>;

@Schema({ timestamps: true })
export class Roomtype {
  @Prop({ required: true })
  price: number;
}

export const RoomtypeSchema = SchemaFactory.createForClass(Roomtype);
