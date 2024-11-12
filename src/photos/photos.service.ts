import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Response } from 'express';

@Injectable()
export class PhotosService {
  private photosFolder = path.join(__dirname, '../../photo');

  async getPhotosUrls() {
    try {
      let filePhoto = await fs.readdir(this.photosFolder);
      filePhoto = filePhoto.reduce((acc, name) => {
        const ext = path.extname(name);
        if (['.jpg', '.jpeg'].includes(ext)) {
          acc.push(`http://localhost:3000/photos/${name}`);
        }
        return acc;
      }, []);
      return filePhoto;
    } catch (e) {
      console.error(e);
    }
  }

  async getPhoto(filename: string, res: Response) {
    const filePath = path.join(this.photosFolder, filename);
    try {
      const ext = path.extname(filename);
      let contentType = 'text/plain';
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        contentType = `image/${ext.substring(1)}`;
      }
      res.setHeader('Content-Type', contentType);
      const content = await fs.readFile(filePath);
      res.send(content);
    } catch (err) {
      console.error(err);
    }
  }
}
