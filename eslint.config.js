import js from '@eslint/js'
import globals from 'globals'
import vue from 'eslint-plugin-vue'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', '.vitepress/cache', '.vitepress/dist']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  ...vue.configs['flat/essential'],
  {
    // Layout names must match frontmatter (`layout: Home`, `layout: site`),
    // and markdown component names are meant to read naturally.
    files: ['.vitepress/**/*.vue', '.vitepress/theme/index.js'],
    rules: { 'vue/multi-word-component-names': 'off' },
  },
])
