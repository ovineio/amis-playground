import { render } from 'amis'

import { env } from './env'

export const renderAmis = (json: any, props: any = {}) => {
  return render(json, props, env)
}
