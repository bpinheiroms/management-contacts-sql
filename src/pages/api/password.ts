import nextConnect from 'next-connect';
import { hashPassword } from './utils';
import { NextApiResponse } from 'next';

const handler = nextConnect();

handler.post(async (req: any, res: NextApiResponse) => {
  const password = await hashPassword(req.body.password);

  res.json({
    password,
  });
});

export default handler;
