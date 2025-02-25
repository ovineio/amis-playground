import * as amis from 'amis'
import * as amisCore from 'amis-core'
import * as amisUi from 'amis-ui'
import axios from 'axios'
import * as copyToClipboard from 'copy-to-clipboard'
import * as lodash from 'lodash'
import * as React from 'react'
import * as reactRouter from 'react-router'
import * as reactRouterDom from 'react-router-dom'

import 'amis/lib/themes/cxd.css'

const dependencies = {
  react: React,
  amis,
  axios,
  lodash,
  'amis-core': amisCore,
  'amis-ui': amisUi,
  'copy-to-clipboard': copyToClipboard,
  'react-router': reactRouter,
  'react-router-dom': reactRouterDom,
}

export default dependencies
