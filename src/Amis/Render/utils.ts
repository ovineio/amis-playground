import { uuidv4 } from 'amis-core'

export const doAmisAction = (ref: any, ...conf) => {
  const scopeRef = ref?.current?.scopeRef || ref || {}
  const actions = conf.flatMap((item) => {
    if (!item) {
      return []
    }

    const { id, type, ...rest } = item
    return {
      actionType: type,
      componentId: id,
      ...rest,
    }
  })
  scopeRef.doAction?.(actions)
}

export const debugAction = {
  logEvent: {
    actionType: 'custom',
    script: (context, _, event) => {
      console.log('【consoleEventAction】=>', {
        context,
        event,
      })
    },
  },
  toastMsg: {
    actionType: 'toast',
    args: {
      msg: `随机ID: ${uuidv4()}`,
    },
  },
}

export const setAmisValue = (ref: any, componentId: string, value: any) => {
  const scopeRef = ref?.current?.scopeRef || ref || {}
  scopeRef.doAction?.([
    {
      actionType: 'setValue',
      componentId,
      args: {
        value,
      },
    },
  ])
}