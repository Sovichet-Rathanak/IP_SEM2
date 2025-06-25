import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookModule } from './modules/book/book.module';
import { StudentModule } from './modules/student/student.module';
import { AttendantModule } from './modules/attendant/attendant.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
    }),
    BookModule,
    StudentModule,
    AttendantModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
