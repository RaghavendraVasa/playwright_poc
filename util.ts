import { test } from '@playwright/test'
import screenshot from 'screenshot-desktop'

export const step = async (name: string, body: Array<() => Promise<void>>): Promise<void> => {
  await test.step(name, async () => {
    for (const func of body) {
      await screenshot({ filename: './screenshot.png' })
      await test.info().attach(`Before-${name.split(' ').join('_')}`, { path: './screenshot.png', contentType: 'image/png' })
      await func()
      await screenshot({ filename: './screenshot.png' })
      await test.info().attach(`After-${name.split(' ').join('_')}`, { path: './screenshot.png', contentType: 'image/png' })
    }
  })
}
