module.exports = (req, res) => {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    message: 'AI图片转视频生成器 API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      openapi: '/openapi.json',
      generateVideo: '/api/generate-video',
      health: '/health'
    }
  });
}; 