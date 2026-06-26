/** @type {import("eslint").Linter.Config} */

import { defineConfig } from 'eslint/config'
import { config as myconfig } from '@repo/eslint-config/base'

export default defineConfig([
  {
    extends: [myconfig],
    ignores: ['ecosystem.config.cjs'],
  },
])
