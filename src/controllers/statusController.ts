import { Request, Response } from 'express';

export const statusController = {
  check: (req: Request, res: Response) => {
    res.status(200).json({ message: 'Backend is healthy!', timestamp: new Date() });
  }
};