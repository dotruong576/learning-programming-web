import DatauriParser from 'datauri/parser';
import { DataURI } from 'datauri/types';
import express from 'express';
import { uploadImage, uploadVideo } from '../../common/firebase';
import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import upload from '../../loader/multer';

const fileRoute = express.Router();

fileRoute.post('/image', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    const error = new AppError(EHttpStatus.BAD_REQUEST, 'Not have file');
    res.status(error.statusCode).json({ data: null, message: error.message });
  }

  const parser = new DatauriParser();
  const source = parser.format(file?.filename || 'name', file?.buffer as DataURI.Input);

  try {
    if (source.content) {
      const response = await uploadImage(source.content);
      res.status(EHttpStatus.OK).json({ data: response, message: 'Upload done' });
    } else {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({ data: null, message: 'Upload failed' });
    }
  } catch (error) {
    console.log(error);
    res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({ data: null, message: 'Upload failed' });
  }
});

fileRoute.post('/video', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    const error = new AppError(EHttpStatus.BAD_REQUEST, 'Not have file');
    res.status(error.statusCode).json({ data: null, message: error.message });
  }

  const parser = new DatauriParser();
  const source = parser.format(file?.filename || 'name', file?.buffer as DataURI.Input);

  try {
    if (source.content) {
      const response = await uploadVideo(source.content);
      res.status(EHttpStatus.OK).json({ data: response, message: 'Upload done' });
    } else {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({ data: null, message: 'Upload failed' });
    }
  } catch (error) {
    console.log(error);
    res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({ data: null, message: 'Upload failed' });
  }
});

export default fileRoute;
