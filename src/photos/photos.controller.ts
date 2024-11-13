import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PhotosService } from './photos.service';


@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Get()
  async getPhotos() {
    return this.photosService.getPhotosUrls();
  }

  @Get(':filename')
  async getPhoto(@Param('filename') filename: string, @Res() res: Response) {
    await this.photosService.getPhoto(filename, res);
  }
}
