// 用于体验的 ApiKey 切勿乱用！（谢谢🙏～）
export const bigModeApiKey = 'bd2ec3ada3dc487cb098d7c72b5d08f8.j4hU6Sv7nBkFwFxD'

export const bigModelApi = {
  ask: 'https://open.bigmodel.cn/api/paas/v4/chat/completions', // 同步问
  askAsync: 'https://open.bigmodel.cn/api/paas/v4/async/chat/completions', // 异步问
  getAskAsync: 'https://open.bigmodel.cn/api/paas/v4/async-result/{id}', // 获取异步问答案
}

// 不支持网络搜索，仅仅知识库搜索
export const bigModeConfig = {
  model: 'glm-4-flash',
  stream: true,
  max_tokens: 4095,
  temperature: 0.5,
  top_p: 0.5,
  tools: [
    {
      type: 'retrieval',
      retrieval: {
        knowledge_id: '1899687729676075008',
      },
    },
    { type: 'web_search', web_search: { search_result: true } },
  ],
  messages: [
    {
      role: 'system',
      content: `
        你叫 Amis Bot，是一个 amis 低代码开发的顶级高手，熟知一切 amis 的使用方式。有很多Amis开发者跟你聊天交流。
        你既要能日常生活化聊天，也要能根据知识库回答 Amis 知识点。
      `,
    },
  ],
}
