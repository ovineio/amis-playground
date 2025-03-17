// TODO: 隐藏大模型关键信息
import { uniqBy } from 'lodash'

// 用于体验的 ApiKey 切勿乱用！（谢谢🙏～）
export const bigModeApiKey = 'bd2ec3ada3dc487cb098d7c72b5d08f8.j4hU6Sv7nBkFwFxD'

const baseUrl = 'https://open.bigmodel.cn/api/paas'
export const bigModelApi = {
  ask: `${baseUrl}/v4/chat/completions`, // 同步问
  askAsync: `${baseUrl}/v4/async/chat/completions`, // 异步问
  getAskAsync: (id: string) => `${baseUrl}/v4/async-result/${id}`, // 获取异步问答案
  uploadFile: `${baseUrl}/v4/files`,
  extractFile: (id: string) => `${baseUrl}/v4/files/${id}/content`,
  deleteFile: (id: string) => `${baseUrl}/v4/files/${id}`,
}

export enum AiRole {
  user = 'user',
  system = 'system',
  assistant = 'assistant',
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
}

const systemPrompt = {
  base: `
<背景>
  你叫 Amis Bot，是一个 amis 低代码开发的顶级高手，熟知一切 amis 的使用方式。有很多Amis开发者跟你聊天交流。
</背景>
<任务>
1.你既要能日常生活化聊天
2.根据知识库回答 Amis 知识点。
</任务>
<执行要求>
1.将"{{用户输入}}"回溯上下文的关联，确保回答的连贯性和一致性。
2.综合分析"{{用户输入}}"在整个对话中的意思，考虑多种可能的视角和因素。
3.从{{知识}}检索{{用户输入}}相关信息，确保回答的准确性和权威性。
4.严谨分析{{用户输入}}，确保回答的专业性和深度。
</执行要求>
`,
  uploadFile: '',
}
type SystemPromptOpts = {
  type?: 'updateFile' | 'professional'
  fileArr?: Array<{
    fileName: string
    fileContent: string
  }>
}

let cacheFileArr: any[] = []
export const clearPromptFileCache = () => {
  cacheFileArr = []
}
export const updateSystemPrompt = (options: SystemPromptOpts) => {
  const { type, fileArr = [] } = options
  switch (type) {
    case 'updateFile':
      cacheFileArr = uniqBy(cacheFileArr.concat(fileArr), 'fileId')
      systemPrompt.uploadFile = `
<任务>

1. 设定 "{{用户输入}}" 中的文件就是，以下"文件信息"。
2. 分析 "{{用户输入}}"，以下"文件信息"的关联性，给出合理答案。
3. 回答时需要"按照执行"要求作答。

"文件信息"：${cacheFileArr
        .flatMap((file) => {
          if (!file?.fileContent) {
            return []
          }
          return [
            `\n文件名：${file.fileName}。
            ${file.fileName}文件的内容：${file.fileContent}。\n`,
          ]
        })
        .join('')}
</任务>
`
      break

    default:
  }
}

export const getSystemPromptMsg = () => {
  return {
    role: 'system',
    content: Object.values(systemPrompt).join('/n'),
  }
}
