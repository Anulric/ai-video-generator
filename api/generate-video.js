module.exports = (req, res) => {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { prompt, style = 'realistic', duration = 8 } = req.body || {};

  if (!prompt) {
    res.status(400).json({
      success: false,
      error: '提示词不能为空'
    });
    return;
  }

  // 模拟成功响应
  res.status(200).json({
    success: true,
    taskId: 'demo-' + Date.now(),
    message: `演示模式：${prompt}，风格：${style}，时长：${duration}秒`,
    demo: true,
    imageUrl: `https://picsum.photos/1024/768?random=${Date.now()}`,
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
  });
}; 