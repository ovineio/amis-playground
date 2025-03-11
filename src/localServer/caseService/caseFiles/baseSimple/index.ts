import amisJson from './amisJson.ts?raw'
import App from './App.tsx?raw'

import { fileName2Language, filePreset } from '@/Playground/utils'

export const baseSimple = {
  [filePreset.app]: {
    name: filePreset.app,
    language: fileName2Language(filePreset.app),
    value: App,
  },
  [filePreset.amisJson]: {
    name: filePreset.amisJson,
    language: fileName2Language(filePreset.amisJson),
    value: amisJson,
  },
}
