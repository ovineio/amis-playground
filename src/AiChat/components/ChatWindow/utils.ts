import { AiRole } from '@/localServer/aiServervice'

const idMsgContentMapRef: any = {}
export const formatChunk = (items: any[]) => {
  let result = {}
  items.forEach((data) => {
    idMsgContentMapRef[data.id] =
      (idMsgContentMapRef[data.id] || '') + (data.choices?.[0]?.delta?.content || '')

    result = {
      code: 'foundation-model',
      id: data.id,
      _role: AiRole.assistant,
      data: {
        sentenceList: [
          {
            content: idMsgContentMapRef[data.id],
          },
        ],
        // 是否流式结束
        streamEnd: !!data.choices?.[0]?.finish_reason,
      },
    }
  })

  return result
}
