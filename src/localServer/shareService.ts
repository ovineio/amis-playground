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

let shareCache = {
  share: '',
  title: '',
  shareId: '',
  shortUrl: '',
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
export const getShareUrl = async (options: ShareOptions): Promise<ShareResult> => {
  // 优化连续多次点击分享，使用相同的 shareId（ID相同，被分享后会以相同位置存储）
  if (!anyChanged(['share', 'title'], shareCache, options)) {
    const fullUrl = getShareFullUrl(shareCache)
    return {
      fullUrl,
      shortUrl: shareCache.shortUrl,
    }
  }

  const shareId = uuidv4()
  const fullUrl = getShareFullUrl({
    ...options,
    shareId,
  })

  let shortUrl = ''
  if (options.useShortUrl) {
    try {
      shortUrl = await dpasteService.shareProject({
        ...options,
        shareId,
        expiryDays: options.expiryDays,
      })
    } catch (err) {
      console.log('dpasteService.shareProject err', err)
    }
  }

  shareCache = {
    title: options.title,
    share: options.share,
    shareId,
    shortUrl,
  }

  return {
    fullUrl,
    shortUrl,
    isShortUrlErr: options.useShortUrl && !shortUrl,
  }
}

export const getShareFormUrl = async () => {
  const urlQuery = new URLSearchParams(location.search)
  const shareId = urlQuery.get('shareId') || ''
  const shareContent = decodeURIComponent(urlQuery.get('share') || '')

  if (shareId || shareContent) {
    // 删除分享参数
    urlQuery.delete('share')
    urlQuery.delete('shareId')
    const newUrl = location.origin + location.pathname + '?' + urlQuery.toString()
    history.replaceState({}, '', newUrl)
  }

  return {
    shareId,
    shareContent,
  }
}
