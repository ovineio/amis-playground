import { toast } from 'amis-ui'
import React, { useContext, useRef, useState } from 'react'

import { SelectCase } from './SelectCase'
import { ShareAction } from './ShareAction'
import { downloadFiles, icons } from './utils'
import { renderAmis } from '../Amis'

import styles from './index.module.less'

import { PlaygroundContext } from '@/Playground/PlaygroundContext'

export const Header: React.FC = () => {
  const { files, appSetting, changeTheme } = useContext(PlaygroundContext)
  const [downloaded, setDownloaded] = useState(false)
  const storeRef = useRef<{
    shareFormRef: any
  }>({
    shareFormRef: {},
  })

  const downloadProject = () => {
    downloadFiles(files).then(() => {
      setDownloaded(true)
      toast.success('已下载到本地～')
      setTimeout(() => {
        setDownloaded(false)
      }, 3000)
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
        {appSetting.theme === 'light' && (
          <button
            title='Toggle dark mode'
            className={styles.theme}
            dangerouslySetInnerHTML={{ __html: icons.SunSvg }}
            onClick={() => changeTheme('dark')}
          />
        )}

        {appSetting.theme === 'dark' && (
          <button
            title='Toggle light mode'
            className={styles.theme}
            dangerouslySetInnerHTML={{ __html: icons.MoonSvg }}
            onClick={() => changeTheme('light')}
          />
        )}

        <ShareAction storeRef={storeRef} />

        <button
          title='Download project files'
          dangerouslySetInnerHTML={{ __html: downloaded ? icons.SuccessSvg : icons.DownloadSvg }}
          onClick={downloadProject}
        />

        <a href='https://github.com/ovineio/amis-playground' target='_blank' title='View on GitHub'>
          <button dangerouslySetInnerHTML={{ __html: icons.GithubSvg }} />
        </a>
      </div>
    </nav>
  )
}
