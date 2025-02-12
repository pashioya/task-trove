import { ResponseStatus } from '@/enums/api';
import type { Request, Response } from 'express';

const healthCheck = (_req: Request, res: Response) => {
  res.status(ResponseStatus.OK).json({ message: 'OK' });
};

export default healthCheck;
