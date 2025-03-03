// app 分享

import { anyChanged, uuidv4 } from 'amis-core'
import axios from 'axios'
import { isString } from 'lodash'

import { getUrlPath } from '@/Playground/utils'

const dpasteGetUrl = 'https://dpaste.com/'
const dpastePostUrl = 'https://dpaste.com/api/v2/'

type DpasteData = {
  title: string
  shareId: string
  share: string
}
const dpasteService = {
  getProject: async (dpasteId: string): Promise<DpasteData> => {
    const result = await axios.get(dpasteGetUrl + dpasteId + '.txt')
    console.log('-->getProject', result)
    const { title, content } = result.data
    const contentData = JSON.parse(decodeURIComponent(content))
    return {
      title,
      ...contentData,
    }
  },
  shareProject: async (config: DpasteData & { expiryDays?: number }): Promise<string> => {
    const { title, expiryDays = 90, ...content } = config
    const result = await axios(dpastePostUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'LiveCodes / https://livecodes.io/',
      },
      data: {
        content: encodeURIComponent(JSON.stringify(content)),
        title: encodeURIComponent(title || ''),
        syntax: 'json',
        expiry_days: import.meta.env.MODE === 'production' ? expiryDays : 1,
      },
    })

    const resData = result.data || ''

    const dpasteId = isString(resData) ? resData.replace(dpasteGetUrl, '').replaceALl('\n', '') : ''
    const dpasteUrl = getUrlPath(`dpasteId=${dpasteId}`)

    return dpasteUrl
  },
}

const shareCache = {
  share: '',
  title: '',
  shareId: '',
  shortUrl: '',
  expiryDays: 90,
}
type ShareOptions = {
  share: string
  title: string
  useShortUrl?: boolean
  expiryDays?: number
}
type ShareResult = {
  fullUrl: string
  shortUrl: string
  isShortUrlErr?: boolean
}
const getShareFullUrl = (options: ShareOptions & { shareId: string }) => {
  let { share, title, shareId } = options
  share = encodeURIComponent(share)
  title = encodeURIComponent(title)
  const shareQueryStr = new URLSearchParams({
    title,
    share,
    shareId,
  }).toString()
  const fullUrl = getUrlPath(shareQueryStr)
  return fullUrl
}

const getShareShortUrl = async (options: ShareOptions & { shareId: string }) => {
  let shortUrl = ''
  try {
    shortUrl = await dpasteService.shareProject({
      ...options,
      shareId: options.shareId,
      expiryDays: options.expiryDays,
    })
  } catch (err) {
    console.log('dpasteService.shareProject err', err)
  }
  return shortUrl
}

export const getShareUrl = async (options: ShareOptions): Promise<ShareResult> => {
  const { useShortUrl } = options
  /**
   * 优化连续多次点击分享，使用相同的 shareId（ID相同，被分享后会以相同位置存储）
   * 如果 “share” 分享的文件内容不变，则使用缓存的 shareId，进行优化
   */
  if (!anyChanged(['share'], shareCache, options)) {
    let shortUrl = ''
    if (useShortUrl) {
      shortUrl = shareCache.shortUrl
      // 如果 title｜expiryDays 变化，使用 cache 的 shareId 进行创建短链
      if (anyChanged(['title', 'expiryDays'], shareCache, options)) {
        shortUrl = await getShareShortUrl({
          ...options,
          shareId: shareCache.shareId,
        })
      }
    }

    const fullUrl = getShareFullUrl(shareCache)
    return {
      fullUrl,
      shortUrl,
      isShortUrlErr: useShortUrl && !shortUrl,
    }
  }

  const shareId = uuidv4()
  const fullUrl = getShareFullUrl({
    ...options,
    shareId,
  })

  let shortUrl = ''
  if (useShortUrl) {
    shortUrl = await getShareShortUrl({
      ...options,
      shareId,
    })
  }

  Object.assign(shareCache, {
    title: options.title,
    expiryDays: options.expiryDays || 90,
    share: options.share,
    shareId,
    shortUrl,
  })

  return {
    fullUrl,
    shortUrl,
    isShortUrlErr: useShortUrl && !shortUrl,
  }
}

export const getShareFormUrl = async () => {
  const urlQuery = new URLSearchParams(location.search)
  const shareId = urlQuery.get('shareId') || ''
  const title = decodeURIComponent(urlQuery.get('title') || '')
  const share = decodeURIComponent(urlQuery.get('share') || '')

  if (shareId || share) {
    // 删除分享参数
    urlQuery.delete('share')
    urlQuery.delete('shareId')
    urlQuery.delete('title')
    const newUrl = location.origin + location.pathname + '?' + urlQuery.toString()
    history.replaceState({}, '', newUrl)
  }

  return {
    title,
    shareId,
    share,
  }
}
