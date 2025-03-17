import * as amisCore from 'amis-core'

export const addReturn2LastJson = (data) => {
  // 将文件内容转换为数组，便于处理
  let lines = data.split('\n')

  // 找到最后一个非空行
  let lastNonEmptyLineIndex = lines.length - 1
  while (lastNonEmptyLineIndex >= 0 && lines[lastNonEmptyLineIndex].trim() === '') {
    lastNonEmptyLineIndex--
  }

  // 检查是否以大括号结尾的独立JSON对象
  if (lastNonEmptyLineIndex >= 0) {
    const lastLine = lines[lastNonEmptyLineIndex].trim()
    if (lastLine === '}') {
      // 找到JSON对象的开始行
      let openBraceCount = 0
      let startLineIndex = lastNonEmptyLineIndex

      while (startLineIndex >= 0) {
        const line = lines[startLineIndex]

        // 计算该行中的大括号数量
        for (let i = line.length - 1; i >= 0; i--) {
          if (line[i] === '}') openBraceCount++
          if (line[i] === '{') openBraceCount--

          // 找到匹配的开始大括号
          if (openBraceCount === 0 && line[i] === '{') {
            // 如果是独立的行上的大括号，在前面添加 return
            if (i === 0 || line.substring(0, i).trim() === '') {
              lines[startLineIndex] = line.substring(0, i) + 'return ' + line.substring(i)
              // 在文件末尾添加分号，如果没有的话
              if (!lines[lastNonEmptyLineIndex].endsWith(';')) {
                lines[lastNonEmptyLineIndex] += ';'
              }
              break
            }
          }
        }

        if (openBraceCount === 0) break
        startLineIndex--
      }
    }
  }
  return lines.join('\n')
}

export const checkIsJson = (code = '') => {
  const isJson = code.trim().startsWith('{')
  return isJson
}

export const getAmisJsonByCode = (code = '') => {
  let json = {}
  let fnCode = ''
  if (checkIsJson(code)) {
    fnCode = `return ${code.trim()}`
  } else {
    fnCode = addReturn2LastJson(code)
  }
  try {
    const fnNames = []
    const fnCalls = []
    Object.keys(amisCore).forEach((fnName) => {
      fnNames.push(fnName)
      fnCalls.push(amisCore[fnName])
    })
    const fnCall = amisCore.str2function(fnCode, ...fnNames)
    json = fnCall(...fnCalls)
  } catch (err) {
    return {
      type: 'alert',
      showIcon: true,
      level: 'danger',
      body: '代码出现错误，请无法渲染',
    }
  }

  return json
}
