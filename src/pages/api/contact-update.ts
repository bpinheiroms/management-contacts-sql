import nextConnect from 'next-connect';

import authorize from './middleware/authorize';
import { NextApiResponse } from 'next';
import { prisma } from './database/prismaClient';
const handler = nextConnect();

handler.use(authorize);

handler.put(async (req: any, res: NextApiResponse) => {
  const { email, name, id } = req.body;

  const identifier = parseInt(id);

  try {
    const contact = await prisma.contacts.findUnique({
      where: {
        id: identifier,
      },
    });

    if (!contact) {
      return res.status(400).json({ message: 'Sorry, it is not possible!' });
    }

    const updateContact = await prisma.contacts.update({
      where: {
        id: identifier,
      },
      data: {
        email,
        name,
      },
    });

    res.json(updateContact);
  } catch (err) {
    res.status(400).json({ message: 'Error updating contact!' });
  }
});

export default handler;
