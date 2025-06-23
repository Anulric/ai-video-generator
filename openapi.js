module.exports = (req, res) => {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    openapi: '3.0.0',
    info: {
      title: 'AI图片转视频生成器',
      description: '基于提示词生成图片并延展为5-10秒视频的AI插件',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '开发服务器'
      },
      {
        url: 'https://your-project.vercel.app',
        description: '生产服务器'
      }
    ],
    paths: {
      '/api/generate-video': {
        post: {
          summary: '生成图片并转换为视频',
          description: '根据提示词生成图片，然后基于图片内容生成5-10秒视频',
          operationId: 'generateImageToVideo',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['prompt'],
                  properties: {
                    prompt: {
                      type: 'string',
                      description: '图片生成提示词，可包含风格、名词、地点、动作等要素',
                      example: '一只可爱的小猫在阳光明媚的花园里玩耍，卡通风格，明亮色彩'
                    },
                    style: {
                      type: 'string',
                      description: '图片风格偏好',
                      enum: ['realistic', 'cartoon', 'anime', 'artistic', 'cinematic'],
                      default: 'realistic'
                    },
                    duration: {
                      type: 'integer',
                      description: '视频时长（秒）',
                      minimum: 5,
                      maximum: 10,
                      default: 8
                    },
                    resolution: {
                      type: 'string',
                      description: '视频分辨率',
                      enum: ['720p', '1080p'],
                      default: '1080p'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: '成功创建任务',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      taskId: { type: 'string' },
                      status: { type: 'string' },
                      message: { type: 'string' },
                      demo: { type: 'boolean' },
                      imageUrl: { type: 'string' },
                      videoUrl: { type: 'string' }
                    }
                  }
                }
              }
            },
            '400': {
              description: '请求参数错误',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      error: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
}; 