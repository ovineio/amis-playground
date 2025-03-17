/**
 * 使用 Amis 的预览框（简易预览）
 * TODO: 抽时间换成和 playground 相同组件（支持多文件和自定义JS）
 */

import { toast, render, makeTranslator } from 'amis'
import { normalizeLink, attachmentAdpator } from 'amis-core'
import { alert, confirm, Editor as CodeEditor } from 'amis-ui'
import axios from 'axios'
import copy from 'copy-to-clipboard'
import React from 'react'
import { matchPath } from 'react-router-dom'

import { ShadowRoot } from './ShadowRoot'
import { checkIsJson, getAmisJsonByCode } from './utils'

import styles from './index.module.less'

import { SplitPane } from '@/Playground/components/SplitPane'

class AmisInlinePreview extends React.Component {
  state = null
  startX = 0
  oldContents = ''
  frameTemplate
  iframeRef
  wrapRef = React.createRef()

  static defaultProps = {
    vertical: false,
  }

  constructor(props) {
    super(props)
    this.iframeRef = React.createRef()
    const { history } = props

    this.state = {
      asideWidth: props.asideWidth || Math.max(300, window.innerWidth * 0.3),
      // schema,
      schemaCode: props.code,
      isOpened: false,
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.removeWindowEvents = this.removeWindowEvents.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.close = this.close.bind(this)
    this.schemaProps = {}

    const __ = makeTranslator(props.locale)

    this.env = {
      session: 'aiChatPreview',
      updateLocation: (location, replace) => {
        // history[replace ? 'replace' : 'push'](normalizeLink(location))
      },
      isCurrentUrl: (to) => {
        // if (!to) {
        //   return false
        // }
        // const link = normalizeLink(to)
        // return !!matchPath(history.location.pathname, {
        //   path: link,
        //   exact: true,
        // })
      },
      jumpTo: (to, action) => {
        // to = normalizeLink(to)

        // if (action && action.actionType === 'url') {
        //   action.blank === true ? window.open(to) : (window.location.href = to)
        //   return
        // }

        // if (action && to && action.target) {
        //   window.open(to, action.target)
        //   return
        // }

        // if (/^https?:\/\//.test(to)) {
        //   window.location.replace(to)
        // } else {
        //   history.push(to)
        // }
      },
      fetcher: async (api) => {
        let { url, method, data, responseType, config, headers } = api
        config = config || {}

        if (typeof url === "string" && url.startsWith("/amis/")) {
          url = url.replace(/^\/amis\//, "https://aisuda.bce.baidu.com/amis/");
        }

        config.url = url
        responseType && (config.responseType = responseType)

        if (config.cancelExecutor) {
          config.cancelToken = new axios.CancelToken(config.cancelExecutor)
        }

        config.headers = headers || {}
        config.method = method
        config.data = data

        if (method === 'get' && data) {
          config.params = data
        } else if (data && data instanceof FormData) {
          // config.headers['Content-Type'] = 'multipart/form-data';
        } else if (
          data &&
          typeof data !== 'string' &&
          !(data instanceof Blob) &&
          !(data instanceof ArrayBuffer)
        ) {
          data = JSON.stringify(data)
          config.headers['Content-Type'] = 'application/json'
        }

        // 支持返回各种报错信息
        config.validateStatus = function () {
          return true
        }

        let response = await axios(config)
        response = await attachmentAdpator(response, __, api)

        if (response.status >= 400) {
          if (response.data) {
            // 主要用于 raw: 模式下，后端自己校验登录，
            if (
              response.status === 401 &&
              response.data.location &&
              response.data.location.startsWith('http')
            ) {
              location.href = response.data.location.replace(
                '{{redirect}}',
                encodeURIComponent(location.href)
              )
              return new Promise(() => {})
            } else if (response.data.msg) {
              throw new Error(response.data.msg)
            } else {
              throw new Error(__('System.requestError') + JSON.stringify(response.data, null, 2))
            }
          } else {
            throw new Error(`${__('System.requestErrorStatus')} ${response.status}`)
          }
        }

        return response
      },
      isCancel: (value) => axios.isCancel(value),
      notify: (type, msg, conf) =>
        toast[type] ? toast[type](msg, conf) : console.warn('[Notify]', type, msg),
      alert,
      confirm,
      copy: (content, options) => {
        copy(content, options)
        toast.success(__('System.copy'))
      },
      tracker(eventTrack) {
        console.debug('eventTrack', eventTrack)
      },
      replaceText: {
        AMIS_HOST: 'https://baidu.gitee.io/amis',
      },
      loadTinymcePlugin: async (tinymce) => {
        // 参考：https://www.tiny.cloud/docs/advanced/creating-a-plugin/
        /*
          Note: We have included the plugin in the same JavaScript file as the TinyMCE
          instance for display purposes only. Tiny recommends not maintaining the plugin
          with the TinyMCE instance and using the `external_plugins` option.
        */
        tinymce.PluginManager.add('example', function (editor, url) {
          const openDialog = function () {
            return editor.windowManager.open({
              title: 'Example plugin',
              body: {
                type: 'panel',
                items: [
                  {
                    type: 'input',
                    name: 'title',
                    label: 'Title',
                  },
                ],
              },
              buttons: [
                {
                  type: 'cancel',
                  text: 'Close',
                },
                {
                  type: 'submit',
                  text: 'Save',
                  primary: true,
                },
              ],
              onSubmit: function (api) {
                const data = api.getData()
                /* Insert content when the window form is submitted */
                editor.insertContent('Title: ' + data.title)
                api.close()
              },
            })
          }
          /* Add a button that opens a window */
          editor.ui.registry.addButton('example', {
            text: 'My button',
            onAction: function () {
              /* Open window */
              openDialog()
            },
          })
          /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
          editor.ui.registry.addMenuItem('example', {
            text: 'Example plugin',
            onAction: function () {
              /* Open window */
              openDialog()
            },
          })
          /* Return the metadata for the help plugin */
          return {
            getMetadata: function () {
              return {
                name: 'Example plugin',
                url: 'http://exampleplugindocsurl.com',
              }
            },
          }
        })
      },
    }

    this.watchIframeReady = this.watchIframeReady.bind(this)
    window.addEventListener('message', this.watchIframeReady, false)
  }

  watchIframeReady(event) {
    // iframe 里面的 amis 初始化了就可以发数据
    if (event.data && event.data === 'amisReady') {
      this.updateIframe()
    }
  }

  updateIframe() {
    if (this.iframeRef && this.iframeRef.current) {
      this.iframeRef.current.contentWindow.postMessage(
        {
          schema: this.state.schema,
          props: { theme: this.props.theme, locale: this.props.locale },
        },
        '*'
      )
    }
  }

  componentDidUpdate(preProps) {
    const props = this.props

    if (preProps.code !== props.code) {
      // const schema = this.buildSchema(props.code || DEFAULT_CONTENT, props)
      this.setState({
        // schema,
        schemaCode: props.code,
      })
    }
  }

  componentDidMount() {
    const { setAsideFolded } = this.props
    setAsideFolded && this.props.setAsideFolded(true)
  }

  componentWillUnmount() {
    this.props.setAsideFolded && this.props.setAsideFolded(false)
    window.removeEventListener('message', this.watchIframeReady, false)
  }

  formatMessage(message, input) {
    if (/position\s?(\d+)$/.test(message)) {
      const lines = input.substring(0, parseInt(RegExp.$1, 10)).split(/\n|\r\n|\r/)
      message = `Json 语法错误，请检测。出错位置：${lines.length}，列：${
        lines[lines.length - 1].length
      }。`
    }

    return message
  }

  renderPreview() {
    let { schema, schemaCode } = this.state

    const props = {
      ...this.schemaProps,
      theme: this.props.theme,
      locale: this.props.locale,
      affixHeader: false,
      affixFooter: false,
    }

    // 非 json 格式，进行执行，获取返回后的 json
    schema = getAmisJsonByCode(schemaCode)

    return render(schema, props, this.env)
  }

  handleChange(value) {
    const { onCodeChange } = this.props
    this.setState({
      schemaCode: value,
    })
    onCodeChange && onCodeChange(value)

    const language = checkIsJson(value) ? 'json' : 'javascript'
    const model = this.editor.getModel()

    const editorLang = model.getLanguageId()

    if (editorLang !== language) {
      this.monaco.editor.setModelLanguage(model, language)
    }
  }

  handleMouseDown(e) {
    this.startX = e.clientX
    this.startWidth = this.state.asideWidth

    // this.startPosition.y = e.clientY;

    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    return false
  }

  handleMouseMove(e) {
    const diff = this.startX - e.clientX
    e.preventDefault()

    this.setState({
      asideWidth: Math.min(800, Math.max(200, this.startWidth + diff)),
    })
  }

  handleMouseUp() {
    this.removeWindowEvents()
  }

  removeWindowEvents() {
    window.removeEventListener('mouseup', this.handleMouseUp)
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  toggleDrawer() {
    this.setState({
      isOpened: !this.state.isOpened,
    })
  }

  close() {
    this.setState({
      isOpened: false,
    })
  }

  editorDidMount = (editor, monaco) => {
    this.editor = editor
    this.monaco = monaco
    const { schemaCode } = this.state

    this.editorAutoHeight()

    if (checkIsJson(schemaCode)) {
      const schemaUrl = `${location.origin}/amis/schema.json`

      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        schemas: [
          {
            uri: schemaUrl,
            fileMatch: ['*'],
          },
        ],
        validate: true,
        enableSchemaRequest: true,
        allowComments: true,
      })
    }
  }

  editorAutoHeight() {
    const { onHightChange } = this.props
    // let ignoreEvent = false
    const updateHeight = () => {
      const height = this.editor.getContentHeight()
      const contentHeight = height > 500 ? 500 : height < 200 ? 200 : height
      onHightChange && onHightChange(contentHeight)
      this.wrapRef.current.style.height = `${contentHeight}px`
      const width = this.wrapRef.current.querySelector('.AmisInlinePreview-code').offsetWidth
      try {
        // ignoreEvent = true
        this.editor.layout({ width: width, height: contentHeight })
      } finally {
        // ignoreEvent = false
      }
    }
    this.editor.onDidContentSizeChange(updateHeight)
    updateHeight()
  }

  renderEditor() {
    const { theme } = this.props
    const options = {
      tabSize: 2,
      overviewRulerBorder: false, // 不要滚动条的边框
      automaticLayout: true,
      // 滚动条设置
      scrollbar: {
        verticalScrollbarSize: 6, // 竖滚动条
        horizontalScrollbarSize: 6, // 横滚动条
        alwaysConsumeMouseWheel: false,
      },
    }
    const { schemaCode } = this.state
    const language = checkIsJson(schemaCode) ? 'json' : 'javascript'
    return (
      <CodeEditor
        value={schemaCode}
        onChange={this.handleChange}
        editorDidMount={this.editorDidMount}
        options={options}
        language={language}
        editorTheme={theme === 'dark' ? 'vs-dark' : 'vs'}
      />
    )
  }

  render() {
    const { className = '', isolationPreview } = this.props
    return (
      <div
        ref={this.wrapRef}
        className={`AmisInlinePreview ${className} ${styles.previewContainer}`}
      >
        <SplitPane>
          <div className='AmisInlinePreview-code'>{this.renderEditor()}</div>
          {isolationPreview ? (
            <ShadowRoot
              className='AmisInlinePreview-preview'
              shadowHtml={`<link rel="stylesheet" href="/amis/cxd.css" />
                  <link rel="stylesheet" href="/amis/helper.css" />
                  <link rel="stylesheet" href="/amis/iconfont.css" />
                `}
            >
              {this.renderPreview()}
            </ShadowRoot>
          ) : (
            <div className='AmisInlinePreview-preview'>{this.renderPreview()}</div>
          )}
        </SplitPane>
      </div>
    )
  }
}

export { AmisInlinePreview, getAmisJsonByCode }
