import { test as base } from '@playwright/test';
import UAParser from 'ua-parser-js'
import screenshot from 'screenshot-desktop'

export const test = base.extend<{ desktopScr: void }>({
    desktopScr: [async ({ page }, use, testInfo) => {
        await use()
        const getUA = await page.evaluate(() => navigator.userAgent)
        const userAgentInfo = UAParser(getUA)
        const browserName = userAgentInfo.browser.name
        const osName = userAgentInfo.os.name
        await page.evaluate(
            async ({ browserName, osName }) => {
                const div = document.createElement('div')
                div.innerHTML = `${new Date().toLocaleString()} <br /> ${browserName as string
                    } <br /> ${osName as string}`
                div.setAttribute(
                    'style',
                    'position: fixed; top: 0; right: 0; width: 100%; height: 100%; z-index: 1000; font-size:160%;'
                )
                document.body.appendChild(div)
            },
            { browserName, osName }
        )
        await page.click(`text=${browserName}`)
        await screenshot({ filename: './screenshot.png' })
        await testInfo.attach('screenshot', { path: './screenshot.png', contentType: 'image/png' })
    }, { auto: true }]
});
export { expect } from '@playwright/test';