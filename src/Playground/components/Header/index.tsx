import { toast, TooltipWrapper } from 'amis-ui'
import axios from 'axios'
import { get } from 'lodash'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { AutoRunAction } from './AutoRunAction'
import { InfoAction } from './InfoAction'
import { SelectCase } from './SelectCase'
// import { SettingAction } from './SettingAction'
import { ShareAction } from './ShareAction'
import { downloadFiles, icons } from './utils'
import { renderAmis } from '../Amis'

import styles from './index.module.less'

import { PlaygroundContext } from '@/Playground/PlaygroundContext'
import { dependencies } from '@/Playground/templateAmis/package.json'

export const Header: React.FC = () => {
  const { files, appSetting, changeTheme } = useContext(PlaygroundContext)
  const [downloaded, setDownloaded] = useState(false)
  const storeRef = useRef<{
    shareFormRef: any
  }>({
    shareFormRef: {},
  })
  const [amisVerInfo, setAmisVerInfo] = useState({
    npmLatestVer: '',
    playgroundVer: '6.11.0',
  })

  useEffect(() => {
    fetchAmisVer()
  }, [])

  const downloadProject = () => {
    downloadFiles(files).then(() => {
      setDownloaded(true)
      toast.success('已下载到本地～')
      setTimeout(() => {
        setDownloaded(false)
      }, 3000)
    })
  }

  const fetchAmisVer = async () => {
    const { data } = await axios.get('https://registry.npmmirror.com/amis')
    const npmLatestVer = get(data, 'dist-tags.latest')
    const playgroundVer = dependencies.amis || '6.11.0'
    setAmisVerInfo({
      npmLatestVer,
      playgroundVer,
    })
  }

  return (
    <nav className={styles.header}>
      {renderAmis('', {
        scopeRef: (ref) => {
          storeRef.current.shareFormRef = ref
        },
      })}
      <a
        target='_blank'
        title='跳转到amis文档'
        href='https://aisuda.bce.baidu.com/amis/zh-CN/docs/index'
      >
        <div className={styles.logo}>
          <img alt='logo' src={icons.AmisLogo} />
          <span> Playground</span>
        </div>
      </a>
      <div className={styles.actions}>
        <SelectCase />
      </div>
      <div className={styles.links}>
        <AutoRunAction />

        <TooltipWrapper
          placement='bottom'
          tooltip={`当前使用版本${
            amisVerInfo.playgroundVer === amisVerInfo.npmLatestVer
              ? '已是 amis 最新版本'
              : `落后amis最新版本，amis最新版本为 V${amisVerInfo.npmLatestVer}`
          }`}
        >
          <a target='_blank' href='https://www.npmjs.com/package/amis/v/6.11.0?activeTab=versions'>
            <button>Amis:V{amisVerInfo.playgroundVer}</button>
          </a>
        </TooltipWrapper>

        <InfoAction />

        {/* <SettingAction /> */}

        <TooltipWrapper placement='bottom' tooltip='切换主题'>
          {appSetting.theme === 'light' ? (
            <button
              className={styles.theme}
              dangerouslySetInnerHTML={{ __html: icons.SunSvg }}
              onClick={() => changeTheme('dark')}
            />
          ) : (
            <button
              className={styles.theme}
              dangerouslySetInnerHTML={{ __html: icons.MoonSvg }}
              onClick={() => changeTheme('light')}
            />
          )}
        </TooltipWrapper>

        <ShareAction storeRef={storeRef} />

        <TooltipWrapper placement='bottom' tooltip='下载'>
          <button
            dangerouslySetInnerHTML={{ __html: downloaded ? icons.SuccessSvg : icons.DownloadSvg }}
            onClick={downloadProject}
          />
        </TooltipWrapper>

        <TooltipWrapper placement='bottom' tooltip='Star Me'>
          <a href='https://github.com/ovineio/amis-playground' target='_blank'>
            <img src='https://img.shields.io/github/stars/ovineio/amis-playground.svg' />
          </a>
        </TooltipWrapper>
      </div>
    </nav>
  )
}
