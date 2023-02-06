import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { UsersController } from './users/users.controller';
import { SearchController } from './search/search.controller';
import { SuggestionsController } from './suggestions/suggestions.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, UsersController, SearchController, SuggestionsController],
  providers: [AppService],
})
export class AppModule {}
