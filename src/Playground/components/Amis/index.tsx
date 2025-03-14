import { render } from 'amis'

import { env } from './env'

export const renderAmis = (json: any, props: any = {}) => {
  return render(json, props, env)
}

let globalAmisScope: any
export const getGlobalAmisScope = () => globalAmisScope
export const GlobalAmisHolder = () => {
  return renderAmis('', {
    scopeRef: (ref) => (globalAmisScope = ref),
  })
}
