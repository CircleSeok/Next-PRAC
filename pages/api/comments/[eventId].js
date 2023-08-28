// /api/comments/some-event-id

function handler(req, res) {
  const eventId = req.query.eventId;

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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);
    res.status(201).json({ message: '댓글 추가 완료', comment: newComment });
  }
  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'sws', text: '1등' },
      { id: 'c1', name: 'WS', text: '2등' },
    ];
    res.status(200).json({
      comment: dummyList,
    });
  }
}

export default handler;
