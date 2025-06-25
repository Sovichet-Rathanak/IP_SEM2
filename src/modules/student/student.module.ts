import { Module } from '@nestjs/common';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
    imports: [],
    controllers: [],
    exports:[StudentService],
    providers: [StudentResolver, StudentService]
})
export class StudentModule {}
