import { test } from './fixtures/screenshotAutoFixture'
import screenshot from 'screenshot-desktop'

export const step = async (name: string, body: Array<() => Promise<void>>) => {
    await test.info().attach('screenshot', { body: await screenshot(), contentType: 'image/png' })
    await test.step(name, async () => {
      for (const func of body) {
        await func()
      }
    })
    await test.info().attach('screenshot', { body: await screenshot(), contentType: 'image/png' })
}