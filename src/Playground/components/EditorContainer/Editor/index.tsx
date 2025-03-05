import MonacoEditor, { Monaco } from '@monaco-editor/react'
import { anyChanged } from 'amis-core'
import React, { useEffect, useRef } from 'react'

import { MonacoEditorConfig } from './monacoConfig'
import { useEditor } from './useEditor'
import { useTypesProgress } from './useProgress'

import { Loading } from '@/Playground/components/Loading'
import type { IEditorOptions } from '@/Playground/types'
import { fileName2Language } from '@/Playground/utils'

import './jsx-highlight.less'
import './useEditorWoker'

interface Props {
  fileName: string
  fileValue: string
  files: any
  theme: string
  setAppSetting: any
  onValueChange?: (code: string | undefined) => void
  options?: IEditorOptions
}

const propsAreEqual = (prev: Props, next: Props) => {
  const isSame = !anyChanged(['fileName', 'theme', 'fileValue'], prev, next)
  return isSame
}

const EditorInner: React.FC<Props> = (props: Props) => {
  const { theme, files, fileName, fileValue, options, onValueChange, setAppSetting } = props

  const editorRef = useRef({
    editor: null as any,
    monaco: null as any,
    typeHelper: null as any,
  })
  const jsxSyntaxHighlightRef = useRef<any>({ highlighter: null, dispose: null })

  const { doOpenEditor, loadJsxSyntaxHighlight, autoLoadExtraLib, loadTsExtraLib } = useEditor()
  const { total, finished, onWatch } = useTypesProgress()

  const handleEditorDidMount = async (editor: any, monaco: Monaco) => {
    editorRef.current.editor = editor
    editorRef.current.monaco = monaco
    // ignore save event
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction('editor.action.formatDocument').run()
    })

    // 初始化自定义文件model
    Object.entries(files).forEach(([fileName]) => {
      if (!monaco?.editor?.getModel(monaco.Uri.parse(`file:///${fileName}`))) {
        monaco?.editor?.createModel(
          files[fileName].value,
          fileName2Language(fileName),
          monaco.Uri.parse(`file:///${fileName}`)
        )
      }
    })

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    })

    // 覆盖原点击变量跳转方法
    editor._codeEditorService.doOpenEditor = function (editor: any, input: any) {
      const path = input.resource.path
      if (!path.startsWith('/node_modules/')) {
        setAppSetting({
          activeFileTab: path.replace('/', ''),
        })
        doOpenEditor(editor, input)
      }
    }

    // 加载jsx高亮
    jsxSyntaxHighlightRef.current = loadJsxSyntaxHighlight(editor, monaco)

    // 加载类型定义文件
    editorRef.current.typeHelper = await autoLoadExtraLib(editor, monaco, fileValue, onWatch)
    loadTsExtraLib(editor, monaco, fileValue, onWatch)
  }

  useEffect(() => {
    const { editor, monaco, typeHelper } = editorRef.current

    editor?.focus()
    jsxSyntaxHighlightRef?.current?.highlighter?.()

    if (fileName) {
      // 初始化自定义文件model
      if (!editor?.getModel(monaco.Uri.parse(`file:///${fileName}`))) {
        editor?.createModel(
          fileValue,
          fileName2Language(fileName),
          monaco.Uri.parse(`file:///${fileName}`)
        )
      }

      // 切换文件名时也需要，主动发起一次类型识别
      if (typeHelper) {
        typeHelper.acquireType(editor.getValue())
      }
    }
  }, [fileName])

  return (
    <>
      <MonacoEditor
        className='react-playground-editor'
        height='100%'
        theme={`vs-${theme}`}
        path={fileName}
        language={fileName2Language(fileName)}
        value={fileValue}
        onChange={onValueChange}
        onMount={handleEditorDidMount}
        loading={<Loading size='lg' text='loading...' />}
        options={{
          ...MonacoEditorConfig,
          ...{
            ...options,
            theme: undefined,
          },
        }}
      />
      <div className='react-playground-editor-types-loading'>
        {total > 0 ? <Loading finished={finished} /> : null}
      </div>
    </>
  )
}

export const Editor = React.memo(EditorInner, propsAreEqual)
