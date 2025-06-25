import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';

@Resolver('Student')
export class StudentResolver {
    constructor(private readonly studentService: StudentService) { }

    @Query('students')
    getAllStudents() {
        return this.studentService.getAll();
    }

    @Query('student')
    getStudentById(@Args('id') id: number) {
        return this.studentService.getById(id);
    }

    @Mutation('enrollStudent')
    enrollStudent(@Args('input') input: { name: string; idCard: string; class: string }) {
        return this.studentService.add(input);
    }

    @Mutation('removeStudent')
    removeStudent(@Args('id') id: number) {
        return this.studentService.remove(id);
    }

    @Mutation('updateStudent')
    updateStudent(@Args('input') input: { id: number; name?: string; idCard?: string; class?: string }) {
        return this.studentService.update(input);
    }

    @Mutation('getStudentsByClassName')
    getStudentsByClassName(@Args('class') className: string) {
        return this.studentService.getByClass(className);
    }
}
