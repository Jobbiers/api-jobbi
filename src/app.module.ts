import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { ConfigModule } from '@nestjs/config';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ProfessionalModule } from './user/professional/professional.module';
import { UserClientModule } from './user/client/client.module';
import { OrdersModule } from './orders/orders.module';
import { BusinessModule } from './business/business.module';
import { ServicesModule } from './services/services.module';
import { OrderStateModule } from './order-state/order-state.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: ['.env.local', '.env'],
    isGlobal: true,
  }), CategoriesModule, SubCategoryModule, UserClientModule, ProfessionalModule, OrdersModule, BusinessModule, ServicesModule, OrderStateModule],
  controllers: [AppController, CategoriesController],
  providers: [AppService, CategoriesService],
})
export class AppModule {}
