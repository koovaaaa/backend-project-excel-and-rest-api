import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { UnsupportedMediaTypeException } from '@nestjs/common';

const setMulterConfig = (dest: string): MulterOptions => {
  return {
    storage: diskStorage({
      destination: (req, file, callback) => {
        fs.mkdir(process.env.ROOT_UPLOAD_DIRECTORY, () => {});
        fs.mkdir(dest, () => {});
        callback(null, dest);
      },
      filename: (req, file, callback) => {
        const originalName = file.originalname;
        const normalized = originalName.replace(/\s+/g, '-');
        callback(null, normalized);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.toLowerCase().match(/\.(xlsx)$/)) {
        return callback(new UnsupportedMediaTypeException(), false);
      }
      callback(null, true);
    },
  };
};

export default setMulterConfig;
