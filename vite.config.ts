import { resolve } from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  define: {
    'process.env': {},
  },
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy', 'classProperties'],
        },
      },
    }),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        svgProps: {
          className: 'icon',
        },
        prettier: false,
        dimensions: false,
      },
    }),
    monacoEditorPlugin({}),
    viteExternalsPlugin({
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-dom/client': 'ReactDOM',
      ChatUI: 'ChatSDK',
      'chatui/core': 'ChatSDK',
      '@ali/chatui-sdk': 'ChatSDK',
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@root': __dirname,
    },
  },
})
