import { diskStorage } from 'multer';

export const storageBanner = {
  storage: diskStorage({
    destination: 'src/assets/banners',
    filename: (req, file, cb) => {
      const filename = file.originalname.replace(/\s/g, '');
      cb(null, filename);
    },
  }),
};

export const storageBlog = {
  storage: diskStorage({
    destination: 'src/assets/blogs',
    filename: (req, file, cb) => {
      const filename = file.originalname.replace(/\s/g, '');
      cb(null, filename);
    },
  }),
};
