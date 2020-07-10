import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forRoot(
    {
      "type": "mysql",
      "host": process.env.HOST,
      "port": 3306,
      "username": process.env.USER,
      "password": process.env.PASSWORD,
      "database": process.env.DB,
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }
  ), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

