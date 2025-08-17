import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "name không được để trống"})
    name: string;

    @IsNotEmpty({ message: "password không được để trống"})
    password: string;
}
