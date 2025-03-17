import * as amis from 'amis'
import * as amisCore from 'amis-core'
import * as amisUi from 'amis-ui'
import axios from 'axios'
import * as copyToClipboard from 'copy-to-clipboard'
import * as fakerest from 'fakerest'
import * as lodash from 'lodash'
import Mock from 'mockjs'
import moment from 'moment'
import * as React from 'react'
import * as reactRouter from 'react-router'
import * as reactRouterDom from 'react-router-dom'
import sinon from 'sinon'

const dependencies = {
  react: React,
  amis,
  axios,
  lodash,
  fakerest,
  mockjs: Mock,
  sinon,
  moment,
  'amis-core': amisCore,
  'amis-ui': amisUi,
  'copy-to-clipboard': copyToClipboard,
  'react-router': reactRouter,
  'react-router-dom': reactRouterDom,
}

export default dependencies
