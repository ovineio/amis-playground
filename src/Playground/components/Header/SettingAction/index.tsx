/**
 * 暂时先不实现该功能（没有太多要设置的内容）
 */

import { TooltipWrapper } from 'amis-ui'

import { icons } from '../utils'

export const SettingAction = () => {
  return (
    <TooltipWrapper placement='bottom' tooltip='打开设置'>
      <button title='View Info' dangerouslySetInnerHTML={{ __html: icons.SettingSvg }} />
    </TooltipWrapper>
  )
}
