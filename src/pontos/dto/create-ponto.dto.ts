import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePontoDto{
    @IsNumber()
    @IsNotEmpty()
    id: number;
    @IsNumber()
    @IsNotEmpty()
    x: number;
    @IsNumber()
    @IsNotEmpty()
    y: number;
} 