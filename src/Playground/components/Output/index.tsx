/**
 * 1. 仍然使用 iframe , 用 esbuild 在 worker 编译 (由于worker中无法使用 window 等，直接放弃)
 * 2. 不需要 worker 编译，直接将编译好代码 ， post 到 iframe, 在 iframe 中执行
 * 2. 使用 直接使用 esbuild 编译+预览 （放弃iframe这套）
 */

import MonacoEditor from '@monaco-editor/react'
import React, { useContext, useEffect, useRef, useState } from 'react'

import CompilerWorker from './compiler.worker.ts?worker&inline'
import { Preview } from './Preview'
import { ViewSelector } from './ViewSelector'
import { MonacoEditorConfig } from '../EditorContainer/Editor/monacoConfig'

import { IMPORT_MAP_FILE_NAME } from '@/Playground/files'
import { PlaygroundContext } from '@/Playground/PlaygroundContext'
import type { IOutput, IPreviewData } from '@/Playground/types'
import { debounce } from '@/Playground/utils'

const viewTypes = ['PREVIEW', 'JS']

export const Output: React.FC<IOutput> = (props) => {
  const { showCompileOutput = true } = props
  const { files, theme, selectedFileName } = useContext(PlaygroundContext)
  const [activedType, setActivedType] = useState('PREVIEW')
  const compilerRef = useRef<Worker | null>(null)
  const [compiledFiles, setCompiledFiles] = useState<IPreviewData>()
  const [compiledCode, setCompiledCode] = useState('')

  const handleViewChange = (type: string) => {
    setActivedType(type)
  }

  // 将编译好的文件，发送给 iframe
  const sendCompiledCode = debounce(() => {
    console.log('=====OutputBundle sendCompiledCode')
    if (activedType === 'PREVIEW') {
      compilerRef.current?.postMessage(files)
    }
    if (activedType === 'JS') {
      compilerRef.current?.postMessage(files[selectedFileName].value)
    }
  }, 50)

  useEffect(() => {
    if (!compilerRef.current) {
      compilerRef.current = new CompilerWorker()
      // compilerRef worker 发来的消息
      compilerRef.current.addEventListener('message', ({ data }: { data: any }) => {
        console.log('=====OutputBundle addEventListener', data)
        // 收到 编译好的 files
        if (data.type === 'UPDATE_FILES') {
          try {
            JSON.parse(files[IMPORT_MAP_FILE_NAME].value)
            data.data.importmap = files[IMPORT_MAP_FILE_NAME].value
          } catch (error) {
            console.error('importmap 解析错误:', error)
          }
          setCompiledFiles(data)
        } else if (data.type === 'UPDATE_FILE') {
          // 收到 编译好的单个文件
          setCompiledCode(data.data)
        } else if (data.type === 'ERROR') {
          console.log(data)
        }
      })
    }
  }, [])

  // 切换面板 预览类型，与文件内容发生变化
  useEffect(() => {
    // 通知需要编译
    sendCompiledCode()
  }, [activedType, files])

  // 将选中的JS文件，设置编译后的代码到 JS 面板（这么做没啥意义）
  useEffect(() => {
    if (selectedFileName === IMPORT_MAP_FILE_NAME || activedType === 'PREVIEW') return
    if (['javascript', 'typescript'].includes(files[selectedFileName]?.language)) {
      compilerRef.current?.postMessage(files[selectedFileName]?.value)
    } else {
      compilerRef.current?.postMessage('')
    }
  }, [selectedFileName])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ViewSelector // 预览类型选择
        items={viewTypes}
        value={activedType}
        onChange={handleViewChange}
        hidden={!showCompileOutput}
      />
      <Preview // 实际预览面板
        iframeKey={files[IMPORT_MAP_FILE_NAME].value}
        hidden={activedType !== 'PREVIEW'}
        data={compiledFiles}
      />
      {showCompileOutput ? ( // 编译后的JS代码
        <div style={{ display: activedType !== 'JS' ? 'none' : '', height: '100%' }}>
          <MonacoEditor
            className='react-playground-editor'
            height='100%'
            theme={`vs-${theme}`}
            value={compiledCode}
            language='javascript'
            options={{
              ...MonacoEditorConfig,
              readOnly: true,
            }}
          />
        </div>
      ) : null}
    </div>
  )
}
