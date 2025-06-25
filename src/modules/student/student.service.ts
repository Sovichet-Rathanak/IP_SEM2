import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
    private students = [
        { id: 1, name: "Sovichet Rathanak", idCard: "e20210706", class: "IP2" },
        { id: 2, name: "Ung Chhoungseang", idCard: "e20211466", class: "Sysadmin" },
        { id: 3, name: "Vuth Menghuor", idCard: "e20213435", class: "Network" }
    ];
    private nextId = 4;

    getAll() {
        return this.students;
    }

    getById(id: number) {
        return this.students.find(s => s.id === id);
    }

    add(input: { name: string; idCard: string; class: string }) {
        const student = { id: this.nextId++, ...input };
        this.students.push(student);
        return student;
    }

    remove(id: number) {
        const index = this.students.findIndex(s => s.id === id);
        if (index === -1) return false;
        this.students.splice(index, 1);
        return true;
    }

    update(input: { id: number; name?: string; idCard?: string; class?: string }) {
        const student = this.getById(input.id);
        if (!student) return null;
        if (input.name !== undefined) student.name = input.name;
        if (input.idCard !== undefined) student.idCard = input.idCard;
        if (input.class !== undefined) student.class = input.class;
        return student;
    }

    getByClass(className: string) {
        return this.students.filter(s => s.class === className);
    }
}
