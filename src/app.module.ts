import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService, UsersService],
})
export class AppModule {}
