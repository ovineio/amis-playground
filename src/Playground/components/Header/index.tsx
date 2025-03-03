import { toast, prompt, confirm, alert } from 'amis-ui'
import React, { useContext, useRef, useState } from 'react'
import copy from 'copy-to-clipboard'
import { SelectCase } from './SelectCase'
import { downloadFiles, icons } from './utils'
import { renderAmis } from '../Amis'

import styles from './index.module.less'

import { PlaygroundContext } from '@/Playground/PlaygroundContext'
import { getShareUrl } from '@/localServer/shareService'

export const Header: React.FC = () => {
  const { files, appSetting, filesHash, changeTheme, setAppSetting } = useContext(PlaygroundContext)
  const [copyed, setCopyed] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const storeRef = useRef<{
    shareFormRef: any
  }>({
    shareFormRef: {},
  })

  const handleShare = async (context, doAction, event) => {
    const { title, useShortUrl, expiryDays } = event.data
    const { fullUrl, shortUrl, isShortUrlErr } = await getShareUrl({
      title,
      useShortUrl,
      expiryDays,
      share: filesHash,
    })

    const copyShareUrl = (url: string) => {
      copy(url, {
        // debug: true,
        format: 'text/plain',
        message: '', // 不提示
        onCopy: () => {
          setCopyed(true)
          toast.success('已复制到剪切板～')
          setTimeout(() => {
            setCopyed(false)
          }, 3000)
        },
      })
    }

    setAppSetting({
      shareConfig: {
        useShortUrl,
        expiryDays,
      },
    })

    if (isShortUrlErr) {
      await alert('生成短链发生错误，当前使用完整链接进行分享。', '提示')
      copyShareUrl(fullUrl)
      return
    }

    const shareUrl = useShortUrl ? shortUrl : fullUrl
    copyShareUrl(shareUrl)
  }

  const handleCopy = async () => {
    const isConfirm = await confirm(
      renderAmis(
        {
          type: 'form',
          id: 'shareForm',
          // debug: true,
          mode: 'horizontal',
          wrapWithPanel: false,
          body: [
            {
              type: 'input-text',
              label: '分享标题',
              name: 'title',
              clearable: true,
              placeholder: '请输入标题',
              required: true,
            },
            // {
            //   type: 'switch',
            //   label: '使用短链接',
            //   onText: '是',
            //   offText: '否',
            //   name: 'useShortUrl',
            // },
            {
              type: 'select',
              name: 'expiryDays',
              label: '短链过期时间',
              visibleOn: '${!!useShortUrl}',
              options: [
                {
                  value: 7,
                  label: '一周',
                },
                {
                  value: 30,
                  label: '一月',
                },
                {
                  value: 90,
                  label: '三月',
                },
                {
                  value: 180,
                  label: '半年',
                },
                {
                  value: 365,
                  label: '一年',
                },
              ],
            },
          ],
          onEvent: {
            validateSucc: {
              actions: [
                {
                  actionType: 'custom',
                  script: handleShare,
                },
              ],
            },
          },
        },
        {
          data: {
            title: appSetting.shareTitle,
            // useShortUrl: appSetting.shareConfig?.useShortUrl || false,
            useShortUrl: false,
            expiryDays: appSetting.shareConfig?.expiryDays || 90,
          },
          scopeRef: (ref) => {
            storeRef.current.shareFormRef = ref
          },
        }
      ),
      '分享代码',
      {
        confirmBtnLevel: 'primary',
        confirmText: '分享',
      }
    )

    if (isConfirm) {
      storeRef.current.shareFormRef.doAction([
        {
          actionType: 'validate',
          componentId: 'shareForm',
        },
      ])
    }
  }

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

        <button
          title='Copy sharable URL'
          dangerouslySetInnerHTML={{ __html: copyed ? icons.SuccessSvg : icons.ShareSvg }}
          onClick={handleCopy}
        />

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
