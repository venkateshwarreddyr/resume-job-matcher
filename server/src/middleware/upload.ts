import multer from 'multer';
import { config } from '../config';
import { ValidationError } from '../types';

const ALLOWED_MIMETYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: config.uploadMaxSize,
  },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ValidationError('Invalid file type. Only PDF and DOCX files are accepted.'));
    }
  },
});
