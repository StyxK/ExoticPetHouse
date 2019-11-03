import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { UserController } from '../user/user.controller';
import { StoreownerService } from '../storeowner/storeowner.service';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('image')
export class ImageController {
  constructor(ImageService: ImageService) {}

  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${new Date().getTime()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@Req() request, @UploadedFile() file) {
    console.log(file);
    return {
      url: "http://"+request.headers.host + '/image/' + file.filename,
      fileName: file.filename,
    };
  }

  @Get('/:filename')
  downloadFile(@Res() res, @Param() params) {
    return res.sendFile(params.filename, { root: 'uploads' });
  }
}
