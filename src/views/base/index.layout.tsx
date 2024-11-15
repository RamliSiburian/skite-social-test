'use client'

import { useLynxModel } from '@lynx/model-reg'
import Portal from './main.layout'

export default useLynxModel(Portal, () => [
  require('@lynx/models/portal/global.model').default,
])
