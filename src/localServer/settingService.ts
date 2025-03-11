// app 设置

import { set, get, update, setMany, getMany, del, delMany } from 'idb-keyval'

const dbKey = {
  appSetting: 'app_setting',
}

export type AppSetting = {
  caseId: string
  caseVersion: number
  splitPanelWidth: number
  activeFileTab: string
  theme: string
  autoRun: boolean
  splitPaneSize: number[]
  shareConfig: {
    useShortUrl: string
    expiryDays: number
  }
}

export const getAppSetting = async (): Promise<Partial<AppSetting>> => {
  const setting = await get(dbKey.appSetting)
  return setting || {}
}

export const setAppSetting = async (appSetting: Partial<AppSetting>) => {
  let newSettings = {}

  await update(dbKey.appSetting, (savedSetting) => {
    newSettings = {
      ...savedSetting,
      ...appSetting,
    }
    return newSettings
  })

  return newSettings
}

export const delAppSettingKeys = async (appSettingKeys: string[] = []) => {
  await update(dbKey.appSetting, (savedSetting) => {
    const newAppSetting = { ...savedSetting }
    appSettingKeys.forEach((key) => {
      delete newAppSetting[key]
    })
    return newAppSetting
  })
}
