import * as yup from 'yup';
import { NextFunction, Request, Response } from 'express';

type SchemaType<T extends yup.AnyObject | yup.Maybe<yup.AnyObject>> =
  yup.ObjectSchema<T>;

const validationBody =
  <T extends yup.AnyObject | yup.Maybe<yup.AnyObject>>(schema: SchemaType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.validateSync(req.body);
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ mensagem: error.message });
      }
      return res.status(500).json({ mensagem: 'Internal server error' });
    }
  };

export default validationBody;