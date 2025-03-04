import { toast, confirm } from 'amis-ui'
import copy from 'copy-to-clipboard'
import React, { useContext, useRef, useState } from 'react'

import { SelectCase } from './SelectCase'
import { downloadFiles, icons } from './utils'
import { renderAmis } from '../Amis'

import styles from './index.module.less'

import { getShareUrl } from '@/localServer/shareService'
import { PlaygroundContext } from '@/Playground/PlaygroundContext'

export const Header: React.FC = () => {
  const { files, appSetting, filesHash, changeTheme, setAppSetting } = useContext(PlaygroundContext)
  const [copyed, setCopyed] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const storeRef = useRef<{
    shareFormRef: any
  }>({
    shareFormRef: {},
  })

  const handleShare = async (data = {}) => {
    const { title, useShortUrl, expiryDays } = data
    const { fullUrl, shortUrl, isShortUrlErr } = await getShareUrl({
      title,
      useShortUrl,
      expiryDays,
      caseId: appSetting.caseId,
      caseVersion: appSetting.caseVersion,
      share: filesHash,
    })

    const copyShareUrl = (url: string) => {
      copy(url, {
        // debug: true,
        format: 'text/plain',
        // message: '', // 不提示
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
      const isConfirm = await confirm('生成短链发生错误，是否使用完整链接进行分享。', '提示', {
        confirmText: '分享',
        confirmBtnLevel: 'primary',
      })
      if (isConfirm) {
        copyShareUrl(fullUrl)
      }
      return
    }

    const shareUrl = useShortUrl ? shortUrl : fullUrl
    copyShareUrl(shareUrl)
  }

  const handleCopy = async () => {
    storeRef.current.shareFormRef.doAction({
      actionType: 'dialog',
      data: {
        title: appSetting.shareTitle,
        useShortUrl: appSetting.shareConfig?.useShortUrl || false,
        // useShortUrl: false,
        expiryDays: appSetting.shareConfig?.expiryDays || 90,
      },
      dialog: {
        title: '分享代码',
        id: 'shareDialog',
        body: {
          type: 'form',
          id: 'shareForm',
          // debug: true,
          mode: 'horizontal',
          wrapWithPanel: false,
          api: {
            url: '/share',
            method: 'post',
            dataProvider: async (req) => {
              await handleShare(req.data)
              return {
                data: {},
              }
            },
          },
          body: [
            {
              type: 'input-text',
              label: '分享标题',
              name: 'title',
              clearable: true,
              placeholder: '请输入',
              required: true,
              maxLength: 12,
              showCounter: true,
              desc: '请输入能够表示代码大致意图的简单文案',
              labelRemark:
                '该标题会作为”版本描述“展示。<br/>如果需要大量描述信息，请在代码编辑器中使用“注释”，进行备注～',
            },
            {
              type: 'switch',
              label: '短链分享',
              onText: '是',
              offText: '否',
              name: 'useShortUrl',
              labelRemark:
                '短链会让URL更加简洁，但是会有过期时间。<br/>可根据分享的意图，设置对应的过期时间。<br/> 如果仅用于个人自测试目的，可无需使用短链。',
            },
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
        },
        actions: [
          {
            type: 'action',
            label: '取消',
            actionType: 'close',
          },
          {
            type: 'action',
            label: '分享',
            level: 'primary',
            actionType: 'submit',
          },
        ],
      },
    })
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
      {renderAmis('', {
        scopeRef: (ref) => {
          storeRef.current.shareFormRef = ref
        },
      })}
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
