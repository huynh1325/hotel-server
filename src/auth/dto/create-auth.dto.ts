import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty({ message: "name kh đc để trống"})
    name: string;

    @IsNotEmpty({ message: "password kh đc để trống"})
    password: string;
}