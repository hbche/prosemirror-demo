import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      // ...tseslint.configs.recommended
      ...tseslint.configs.recommendedTypeChecked,
      // 添加此规则以获得严格的规则
      ...tseslint.configs.strictTypeChecked,
      // 添加此配置以获得风格化规则
      ...tseslint.configs.stylelisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      // 添加 react-x 和 react-dom 插件
      'react-x': reactX,
      'react-dom': reactDom,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 启用其推荐的 TypeScript 规则
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,
    },
  },
)
