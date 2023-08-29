import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: '잘못된 이메일 주소' });
      return;
    }

    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_URI
    );

    const db = client.db('events');

    await db.collection('newsletter').insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: '가입 완료!' });
  }
}

export default handler;
