import { TooltipWrapper } from 'amis-ui'
import { mapValues, trimStart } from 'lodash'
import JsonView from 'react-json-view'

import { icons } from '../utils'

import styles from './index.module.less'

import { dependencies } from '@/Playground/templateAmis/package.json'

const dependenciesObj = mapValues(dependencies, (v) => trimStart(v, '^'))

const amisDoc = 'https://aisuda.bce.baidu.com/amis/zh-CN/components/page'
const reactRouterV5Doc = 'https://v5.reactrouter.com/web/guides/quick-start'
const reactDoc = 'https://react.dev/reference/react'

const pkgDocMap = {
  react: reactDoc,
  'react-dom': reactDoc,
  'react-router': reactRouterV5Doc,
  'react-router-dom': reactRouterV5Doc,
  amis: amisDoc,
  'amis-core': amisDoc,
  'amis-ui': amisDoc,
  axios: 'https://axios-http.com/docs/intro',
  lodash: 'https://lodash.com/docs/4.17.15',
  moment: 'https://momentjs.cn/docs/#/use-it/',
  mockjs: 'http://mockjs.com/examples.html',
  fakerest: 'https://github.com/marmelab/FakeRest#rest-syntax',
  sinon: 'https://sinonjs.org/releases/v19/fake-xhr-and-server/'
}

export const InfoAction = () => {

  const handleSelectPkg = (pkg: any) => {
    const { name, value } = pkg
    const defDoc = `https://www.npmjs.com/package/${name}/v/${value}`
    const doc = pkgDocMap[name] || defDoc
    window.open(doc, '_blank')
  }

  const renderInfo = () => {
    return (
      <div className={styles.infoPanel}>
        <h6>功能说明</h6>
        <ul>
          <li>支持 react18 以及 amis 相关代码的编辑与预览。</li>
          <li>暂不支持切换 amis版本， 仅支持固定版本。</li>
          <li>暂不支持 amis 主题/语言 设置(仅支持 cxd主题 与 zh语言)。</li>
          <li>暂不支持 import 第三包的样式文件（可引入代码编辑的css）</li>
          <li>暂不支持 使用任意的第三方包，仅支持列举的第三方包及版本。</li>
        </ul>
        <h6>可用npm包及版本</h6>
        <span className={styles.desc}>点击"版本号"可跳转对应包的文档</span>
        <JsonView
          name={false}
          src={dependenciesObj}
          indentWidth={2}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          onSelect={handleSelectPkg}
        />
      </div>
    )
  }

  return (
    <TooltipWrapper
      placement='bottom'
      tooltipClassName={styles.tooltipWrapper}
      tooltip={{
        showArrow: false,
        children: renderInfo(),
        // trigger: 'click'
      }}
    >
      <button title='View Info' dangerouslySetInnerHTML={{ __html: icons.InfoSvg }} />
    </TooltipWrapper>
  )
}
