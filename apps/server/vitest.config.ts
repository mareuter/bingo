import { defineProject, mergeConfig } from 'vitest/config'
import { sharedConfig } from '@repo/vitest-config'

export default mergeConfig(
  sharedConfig,
  defineProject({
    test: {
      // Package-specific overrides if needed
    },
  }),
)
