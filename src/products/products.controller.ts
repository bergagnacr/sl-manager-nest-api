import {
  Controller,
  //   FileTypeValidator,
  Get,
  Param,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { providerNameType } from './types';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  getProducts(): string {
    return 'GetProducts';
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':provider/upload/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcelFile(
    @Param('provider')
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 2048 * 2048 * 4 })],
      }),
    )
    file: Express.Multer.File,
    @Param('provider') provider: providerNameType,
  ) {
    console.log(file, provider);
    return this.productService.readExcel(file, provider);
  }
}
