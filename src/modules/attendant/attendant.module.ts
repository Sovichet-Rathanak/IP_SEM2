import { Module } from '@nestjs/common';
import { AttendantResolver } from './attendant.resolver';
import { StudentModule } from '../student/student.module';

@Module({
  providers: [AttendantResolver],
  imports: [StudentModule]
})
export class AttendantModule {}
