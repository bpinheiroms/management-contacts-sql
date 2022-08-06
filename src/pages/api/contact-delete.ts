import nextConnect from 'next-connect';
import authorize from './middleware/authorize';
import { NextApiResponse } from 'next';
import { prisma } from './database/prismaClient';
const handler = nextConnect();

handler.use(authorize);

handler.delete(async (req: any, res: NextApiResponse) => {
  const { id } = req.query;
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

    const updateContact = await prisma.contacts.delete({
      where: {
        id: identifier,
      },
    });

    res.json(updateContact);
  } catch (err) {
    res.status(400).json({ message: 'Error deleting contact!' });
  }
});

export default handler;
