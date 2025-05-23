import { IsNotEmpty, IsOptional } from "class-validator";

export class createTaskDto {
    @IsNotEmpty({ message: 'Task name cannot be empty' })
    name: string;

    @IsOptional()
    description?: string;
}