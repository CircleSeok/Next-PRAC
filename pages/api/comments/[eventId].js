import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '@/helpers/db-util';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: '데이터베이스 연결 실패' });
    return;
  }

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
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id === result.insertedId;
      res.status(201).json({ message: '댓글 추가 완료', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: '댓글 추가 실패' });
    }
  }
  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: '댓글 가져오기 실패' });
    }
  }

  client.close();
}

export default handler;
