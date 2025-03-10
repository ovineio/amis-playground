import React, { createContext, useEffect, useState } from 'react'

import { setCaseFiles } from './components/Header/utils'
import { MAIN_FILE_NAME } from './templateAmis/files'
import { fileName2Language, json2hash, setPlaygroundTheme, utoa } from './utils'

import type { ContextAppSetting, IFiles, IPlaygroundContext } from './types'
import * as settingService from '@/localServer/settingService'

const initialContext: Partial<IPlaygroundContext> = {
  selectedFileName: MAIN_FILE_NAME,
}

export const PlaygroundContext = createContext<IPlaygroundContext>(
  initialContext as IPlaygroundContext
)

export const PlaygroundProvider = (props: {
  children: React.ReactElement
  saveOnUrl?: boolean
}) => {
  const { children } = props

  const [files, setFiles] = useState<IFiles>({})
  const [filesHash, setFilesHash] = useState('')
  const [appSetting, _setAppSetting] = useState<Partial<ContextAppSetting>>({
    initial: false,
    theme: 'light',
    shareTitle: '',
    autoRun: true,
    codeRunId: 0,
    activeFileTab: MAIN_FILE_NAME,
  })

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: '',
    }
    setFiles({ ...files })
  }

  const removeFile = (name: string) => {
    delete files[name]
    setFiles({ ...files })
  }

  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (!files[oldFieldName] || newFieldName === undefined || newFieldName === null) return
    const { [oldFieldName]: value, ...rest } = files
    const newFile = {
      [newFieldName]: {
        ...value,
        language: fileName2Language(newFieldName),
        name: newFieldName,
      },
    }
    setFiles({
      ...rest,
      ...newFile,
    })
  }

  const changeTheme = (theme) => {
    setPlaygroundTheme(theme)
    setAppSetting({ theme })
  }

  useEffect(() => {
    const filesHash = json2hash(files)
    setFilesHash(filesHash)
    const { caseId, caseVersion } = appSetting
    if (caseId && caseVersion) {
      setCaseFiles({
        caseId,
        caseVersion,
        filesHash,
      })
    }
  }, [files])

  const setAppSetting = async (setting: ContextAppSetting) => {
    const { initial, shareTitle, codeRunId, ...rest } = setting
    _setAppSetting((pre) => ({
      ...pre,
      ...setting,
    }))
    settingService.setAppSetting(rest)
  }

  return (
    <PlaygroundContext.Provider
      value={{
        appSetting,
        setAppSetting,
        changeTheme,
        filesHash,
        files,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}
