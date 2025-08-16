import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type MenuDocument = HydratedDocument<Menu>;

@Schema({ timestamps: true })
export class Menu {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;
  
  @Prop({ required: true })
  unit: string;
  
  @Prop({ required: true })
  stock: string;
  
  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);