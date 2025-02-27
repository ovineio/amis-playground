import upperFirst from 'lodash/upperFirst'
import React from 'react'

import styles from './index.module.less'

interface Props {
  finished?: boolean
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Loading: React.FC<Props> = (props: Props) => {
  const { finished = false, text = '', size = 'sm' } = props
  if (finished) {
    return null
  }
  return (
    <div>
      <div className={styles.loader + ' ' + styles[`loader${upperFirst(size)}`]} />
      {text && <span className={styles.text}>{text}</span>}
    </div>
  )
}
