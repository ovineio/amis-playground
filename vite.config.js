import { defineConfig } from 'vite'
import path from 'path'
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy', 'classProperties']
        }
      }
    }),
    monacoEditorPlugin({})
  ],
  server: {
    host: '0.0.0.0',
    port: 8888
  },
  resolve: {
    alias: [
      {
        find: 'bundler',
        replacement: path.resolve(__dirname, './packages/bundler/src')
      },
      {
        find: 'code-kitchen',
        replacement: path.resolve(__dirname, './packages/code-kitchen/src')
      },
    ]
  }
})
