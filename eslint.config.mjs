import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import js from '@eslint/js'
import next from 'eslint-config-next'
import prettier from 'eslint-config-prettier'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),

  js.configs.recommended,
  ...next,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-img-element': 'off',
    },
  },

  js.configs.recommended,
  ...next,
  prettier,
])

export default eslintConfig
