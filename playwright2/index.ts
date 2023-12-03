import { beforeMount } from '@playwright/experimental-ct-vue/hooks'
import { router } from '@/router'

export interface HooksConfig {
  enableRouting?: boolean
}

beforeMount<HooksConfig>(async ({ app, hooksConfig }) => {
  if (hooksConfig?.enableRouting)
    app.use(router)
})
