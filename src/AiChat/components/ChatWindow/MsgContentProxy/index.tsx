/**
 * TODO:
 * 1. 支持 json/js 转 amis.
 * 2. 支持放/大全屏
 * 3. 支持使用 amisEditor 打开
 * 4. 支持更加简单的 mock api(训练AI)
 * 5. 把整个AI chat 完全自定义（没必要那么多DOM操作）
 */

import { uuidv4 } from 'amis-core'
import classNames from 'classnames'
import { debounce, isUndefined } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

import styles from './index.module.less'

import { AmisInlinePreview, getAmisJsonByCode } from '@/Amis'
import { AiRole } from '@/localServer/aiServervice'

type Props = {
  msg: any
  children: any
}
export const MsgContentProxy = (props: Props) => {
  const { msg, children } = props
  const isBotMsg = msg._role === AiRole.assistant

  if (!isBotMsg) {
    return children
  }

  return <BotMsgCon msg={msg}>{children}</BotMsgCon>
}

let cacheObserver: any = null
const BotMsgCon = (props: Props) => {
  const { children, msg } = props

  const isModelMsg = msg.code === 'foundation-model'
  const isStreamEnd = msg?.data?.streamEnd

  const storeRef = useRef<{
    msgContainer: any
    toggleSandbox?: (toggle: boolean) => void
  }>({
    msgContainer: null,
  })

  const [lazyInitFlag, setLazyFlag] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLazyFlag(true)
    }, 1500)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const { msgContainer } = storeRef.current

    if (!msgContainer || !lazyInitFlag || isModelMsg) {
      return
    }

    const unobserve = observerVisible()

    return () => {
      unobserve?.()
    }
  }, [lazyInitFlag])

  useEffect(() => {
    if (!isStreamEnd) {
      return
    }

    const { msgContainer } = storeRef.current

    let timer = 0
    let lastText = ''
    let unobserve
    const checkTextDiff = () => {
      const currText = msgContainer.innerText
      if (currText === lastText) {
        unobserve = observerVisible()
        return
      }
      lastText = currText
      timer = setTimeout(() => {
        checkTextDiff()
      }, 1000)
    }

    checkTextDiff()

    return () => {
      clearTimeout(timer)
      unobserve?.()
    }
  }, [isStreamEnd])

  const observerVisible = () => {
    const { msgContainer } = storeRef.current
    if (!msgContainer.renderAmisSandbox) {
      msgContainer.renderAmisSandbox = renderAmisSandbox
    }

    if (!cacheObserver) {
      // 延迟1s 初始化监听
      cacheObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target?.renderAmisSandbox(entry.isIntersecting)
          })
        },
        {
          root: document.querySelector('#aiChatRoot .MessageContainer'),
          rootMargin: '0px',
          threshold: 0.1, // Adjust this threshold as needed
        }
      )
    }

    cacheObserver.observe(msgContainer)

    return () => {
      cacheObserver?.unobserve?.(msgContainer)
      cacheObserver = null
    }
  }

  const renderAmisSandbox = (isShow: boolean) => {
    const { msgContainer } = storeRef.current

    if (msgContainer.noSandbox) {
      return
    }

    if (msgContainer.toggleSandbox) {
      msgContainer.toggleSandbox(isShow)
      return
    }

    const mdCls = 'tongyi-ui-markdown'
    const mdPanels = msgContainer.querySelectorAll(`.${mdCls}`)

    const amisCodes = []
    const checkAmisCode = (child) => {
      const codeLang = child
        .querySelector('.tongyi-ui-highlighter-lang')
        ?.textContent?.trim()
        .toLowerCase()

      if (!codeLang || !['javascript', 'typescript', 'json'].indexOf(codeLang)) {
        return
      }

      const codeHeader = child.querySelector('.tongyi-ui-highlighter-header')
      const codeTextPanel = codeHeader?.nextElementSibling

      if (!codeHeader || !codeTextPanel) {
        return
      }

      const clonePre = codeTextPanel.cloneNode(true)
      clonePre.querySelectorAll('span.linenumber').forEach((item) => item.remove())
      const codeText = clonePre.textContent?.trim()
      if (!codeText || !getAmisJsonByCode(codeText)?.type) {
        return
      }

      const codeInfo = {
        id: uuidv4,
        codeText,
        codeTextPanel,
      }
      amisCodes.push(codeInfo)
      return codeInfo
    }

    const wrapMdCls = (child, parent) => {
      const wrap = document.createElement('div')
      wrap.classList.add(mdCls)
      wrap.append(child.cloneNode(true))
      parent.replaceChild(wrap, child)
    }

    const codeCls = 'pre>.tongyi-ui-highlighter'
    const notContainCode = (node) => {
      return node?.tagName !== 'PRE' && !node?.querySelector(codeCls)
    }

    const fragment = document.createDocumentFragment()
    // 解决 MD下的 code 样式冲突
    mdPanels.forEach((item) => {
      const cloneMd = item.cloneNode(true)
      cloneMd.classList.remove(mdCls)
      const pres = cloneMd.querySelectorAll(codeCls)
      if (pres.length) {
        ;[...pres].forEach((code) => {
          const preNode = code.parentNode
          ;[...preNode.parentNode.children].forEach((item) => {
            if (item === preNode) {
              // 解析 code 的代码
              checkAmisCode(preNode)
            } else if (notContainCode(item)) {
              // 兄弟元素 全部添加 md 类
              wrapMdCls(item, preNode.parentNode)
            }
          })
        })
      }
      // md的直接子节点，再检查一次
      ;[...cloneMd.children].forEach((item) => {
        if (notContainCode(item) && !item.classList.contains(mdCls)) {
          wrapMdCls(item, cloneMd)
        }
      })
      fragment.append(cloneMd)
    })

    if (!amisCodes.length) {
      msgContainer.noSandbox = true
      return
    }

    mdPanels.forEach((item) => {
      item.replaceWith(fragment.querySelector(':nth-child(1)'))
    })

    handleToggleSandbox({
      isShow,
      amisCodes,
    })
  }

  const handleToggleSandbox = (options) => {
    const { amisCodes, isShow } = options
    const { msgContainer } = storeRef.current

    let reactRoots: any[] = []
    let replaceDoms: any[] = []
    const sandboxRoots: any[] = []
    const heightCache = {
      //
    }
    const cacheCode = {
      //
    }

    const toggleSandbox = (toggle: boolean) => {
      if (!msgContainer.classList.contains(styles.msgWidthFull)) {
        msgContainer.classList.add(styles.msgWidthFull)
      }
      const fragment = document.createDocumentFragment()
      // 首次挂载
      const isFirstMount = !sandboxRoots.length

      amisCodes.forEach(({ id, codeText, codeTextPanel }, index) => {
        const newDom = document.createElement('div')
        newDom.className = styles.sandboxRoot
        if (heightCache[id]) {
          newDom.style.height = `${heightCache[id]}px`
        }

        // 渲染编辑器
        if (toggle) {
          replaceDoms[index] = isFirstMount ? codeTextPanel : sandboxRoots[index]
          sandboxRoots[index] = newDom
          fragment.append(newDom)
          reactRoots[index] = createRoot(newDom)

          const code = isUndefined(cacheCode[id]) ? codeText : cacheCode[id]
          const onCodeChange = (code) => {
            cacheCode[id] = code
          }
          const onHightChange = (height) => {
            heightCache[id] = height
            newDom.style.height = `${height}px`
          }

          reactRoots[index].render(
            <AmisInlinePreview
              isolationPreview={false}
              code={code}
              onHightChange={onHightChange}
              onCodeChange={onCodeChange}
              location={location}
            />
          )
        } else if (toggle === false) {
          if (isFirstMount) {
            replaceDoms[index] = codeTextPanel
            sandboxRoots[index] = newDom
            fragment.append(newDom)
          } else {
            // 卸载编辑器
            reactRoots[index]?.unmount()
            reactRoots = []
            replaceDoms = []
          }
        }
      })

      // 最后再将 新建节点 插入  dom
      if (replaceDoms.length) {
        replaceDoms.forEach((replaceDom) => {
          replaceDom.replaceWith(fragment.querySelector(':nth-child(1)'))
        })
      }
    }

    const debounceToggle = debounce(toggleSandbox, 250)
    debounceToggle(isShow)
    storeRef.current.msgContainer.toggleSandbox = debounceToggle
  }

  return (
    <div
      className={classNames(styles.botMsgContainer, 'AiChatBotMsgItem')}
      ref={(ref) => (storeRef.current.msgContainer = ref)}
    >
      {children}
    </div>
  )
}
