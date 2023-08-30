import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_URI);

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: '올바르지 않은 입력' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db('events');

    const result = await db.collection('comments').insertOne(newComment);

    console.log(result);

    newComment.id === result.insertedId;
    res.status(201).json({ message: '댓글 추가 완료', comment: newComment });
  }
  if (req.method === 'GET') {
    const db = client.db('events');
    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
