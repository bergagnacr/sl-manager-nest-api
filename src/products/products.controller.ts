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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  getProducts(): string {
    return 'GetProducts';
  }

  @Post(':provider/upx`load/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcelFile(
    @Param('provider')
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          //   new FileTypeValidator({ fileType: '.(xlsx)' }),
          new MaxFileSizeValidator({ maxSize: 2048 * 2048 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param() params,
  ) {
    return this.productService.readExcel(file, params.provider);
  }
}
