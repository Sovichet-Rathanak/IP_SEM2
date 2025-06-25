import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from '../student/student.service';

@Resolver('Attendant')
export class AttendantResolver {
    constructor(private readonly studentService: StudentService) { }

    private attendances: {
        session: string;
        status: 'P' | 'AP' | 'L' | 'A';
        student_id: number;
        marker: string;
    }[] = [];

    @Mutation('markAttendance')
    markAttendance(@Args('input') input: {
        session: string;
        status: 'P' | 'AP' | 'L' | 'A';
        student_id: number;
        marker: string;
    }) {
        this.attendances.push(input);
        return input;
    }

    @Mutation('removeAttendance')
    removeAttendance(@Args('student_id') studentId: number, @Args('session') session: string) {
        const index = this.attendances.findIndex(
            a => a.student_id === studentId && a.session === session
        );
        if (index === -1) return false;
        this.attendances.splice(index, 1);
        return true;
    }

    @Query('countAttendanceByStudentId')
    countAttendanceByStudentId(@Args('student_id') studentId: number) {
        return this.attendances.filter(a => a.student_id === studentId).length;
    }

    @Query('countAttendanceByClassName')
    countAttendanceByClassName(@Args('class') className: string) {
        const students = this.studentService.getByClass(className);
        const ids = students.map(s => s.id);
        return this.attendances.filter(a => ids.includes(a.student_id)).length;
    }
}
