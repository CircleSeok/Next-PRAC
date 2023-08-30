import { connectDatabase, insertDocument } from '@/helpers/db-util';


async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: '잘못된 이메일 주소' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: '데이터베이스 연결 실패',
      });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({
        message: '데이터  삽입 실패',
      });
      return;
    }

    res.status(201).json({ message: '가입 완료!' });
  }
}

export default handler;
