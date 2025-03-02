import React, { useContext, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { SelectCase } from './SelectCase'
import { downloadFiles, icons } from './utils'

import styles from './index.module.less'

import { PlaygroundContext } from '@/Playground/PlaygroundContext'

export const Header: React.FC = () => {
  const { files, appSetting, changeTheme, filesHash } = useContext(PlaygroundContext)
  const [copyed, setCopyed] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const shareHash = encodeURIComponent(filesHash)

  const shareUrl =
    window.self !== window.top
      ? `${window.parent.location.host}${window.parent.location.pathname}?share=${shareHash}`
      : `${location.host}${location.pathname}?share=${shareHash}`

  const copyLink = () => {
    setCopyed(true)
    setTimeout(() => {
      setCopyed(false)
    }, 3000)
  }

  const downloadProject = () => {
    downloadFiles(files).then(() => {
      setDownloaded(true)
      setTimeout(() => {
        setDownloaded(false)
      }, 3000)
    })
  }

  return (
    <nav className={styles.header}>
      <a target='_blank' href='https://github.com/ovineio/amis-playground'>
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

        <CopyToClipboard text={shareUrl} onCopy={copyLink}>
          <button
            title='Copy sharable URL'
            dangerouslySetInnerHTML={{ __html: copyed ? icons.SuccessSvg : icons.ShareSvg }}
            onClick={copyLink}
          />
        </CopyToClipboard>

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
