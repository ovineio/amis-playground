// app 分享

import { anyChanged, uuidv4 } from 'amis-core'
import axios from 'axios'
import { get, set } from 'idb-keyval'
import { isString } from 'lodash'

import { caseType, getCaseFiles, getCaseVersions } from './caseService'

import { getUrlPath } from '@/Playground/utils'

const dbKey = {
  appShareCache: 'app_share_cache',
}

const dpasteGetUrl = 'https://dpaste.com/'
const dpastePostUrl = 'https://dpaste.com/api/v2/'

type ShareData = {
  title: string
  shareId: string
  share: string
}
const dpasteService = {
  getProject: async (dpasteId: string): Promise<ShareData> => {
    const result = await axios.get(dpasteGetUrl + dpasteId + '.txt')
    const shareData = JSON.parse(decodeURIComponent(result.data))
    return shareData
  },
  shareProject: async (config: ShareData & { expiryDays?: number }): Promise<string> => {
    const { title, expiryDays = 90, share, shareId } = config
    const shareData = {
      share,
      shareId,
      title,
    }
    const result = await axios(dpastePostUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'LiveCodes / https://livecodes.io/',
      },
      data: {
        content: encodeURIComponent(JSON.stringify(shareData)),
        title: shareId,
        syntax: 'json',
        expiry_days: import.meta.env.MODE === 'production' ? expiryDays : 1,
      },
    })

    const resData = result.data || ''

    const dpasteId = isString(resData) ? resData.replace(dpasteGetUrl, '').replaceAll('\n', '') : ''
    const dpasteUrl = getUrlPath(`dpasteId=${dpasteId}`)

    return dpasteUrl
  },
}

type ShareCache = {
  share: string
  shareId: string
  shortUrl: string
  expiryDays: number
}

const setShareCache = async (cache: ShareCache) => {
  await set(dbKey.appShareCache, cache)
}

const getShareCache = async () => {
  const cache = await get(dbKey.appShareCache)
  if (!cache) {
    return {
      share: '',
      shareId: '',
      shortUrl: '',
      expiryDays: 90,
    }
  }

  return cache
}

type ShareOptions = {
  share: string
  title: string
  caseId?: string
  caseVersion?: number | string
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

  const shareCache = await getShareCache()

  /**
   * 优化1: 优化连续多次点击分享，使用相同的 shareId（ID相同，被分享后会以相同位置存储）
   * 如果 “share” 分享的文件内容不变，则使用缓存的 shareId，进行优化
   * start:
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

    const fullUrl = getShareFullUrl({
      ...shareCache,
      title: options.title,
    })

    return {
      fullUrl,
      shortUrl,
      isShortUrlErr: useShortUrl && !shortUrl,
    }
  }
  // end

  let shareId = uuidv4()

  /**
   * 优化2: 如果将他人分享的代码任何不做修改，直接分享，则使用相同 shareId。（防止分享的相同代码不断占用空间）
   * start:
   */
  const { caseId, caseVersion } = options
  if (caseId && caseVersion && caseType.formShare(caseId)) {
    const { filesHash, pristineFilesHash } = await getCaseFiles(caseId, caseVersion, true)
    if (filesHash === pristineFilesHash) {
      const versions = await getCaseVersions(caseId)
      const version = versions.find((item) => `${item.value}` === `${caseVersion}`)
      if (version?.id) {
        shareId = version.id
      }
    }
  }
  // end

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

  await setShareCache({
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

type ShareDataResult = ShareData & {
  isShortUrlExpired?: true
}
export const getShareFormUrl = async () => {
  const urlQuery = new URLSearchParams(location.search)

  const dpasteId = urlQuery.get('dpasteId') || ''

  let shareData: Partial<ShareData> = {}

  if (dpasteId) {
    try {
      shareData = await dpasteService.getProject(dpasteId)
    } catch {
      //
    }
  } else {
    shareData = {
      shareId: urlQuery.get('shareId') || '',
      title: decodeURIComponent(urlQuery.get('title') || ''),
      share: decodeURIComponent(urlQuery.get('share') || ''),
    }
  }

  if (shareData.shareId || shareData.share) {
    // 删除分享参数
    Object.keys(shareData)
      .concat(['dpasteId'])
      .forEach((key) => {
        urlQuery.delete(key)
      })

    const newUrl = location.origin + location.pathname + '?' + urlQuery.toString()
    history.replaceState({}, '', newUrl)
  }

  if (!shareData.shareId && !shareData.share) {
    return
  }

  return shareData as ShareDataResult
}
