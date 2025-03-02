import amisJson from './amisJson.ts?raw'
import App from './App.tsx?raw'

import { fileName2Language } from '@/Playground/utils'

export const baseSimple = {
  'App.tsx': {
    name: 'App.tsx',
    language: fileName2Language('App.tsx'),
    value: App,
  },
  'amisJson.ts': {
    name: 'amisJson.ts',
    language: fileName2Language('amisJson.ts'),
    value: amisJson,
  },
}
