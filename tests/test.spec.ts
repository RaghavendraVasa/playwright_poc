import { test, expect } from '@playwright/test'
import UAParser from 'ua-parser-js'
import * as fs from 'fs';
import screenshot from 'screenshot-desktop'

test.afterEach(async ({ page }) => {
  const getUA = await page.evaluate(() => navigator.userAgent)
  const userAgentInfo = UAParser(getUA)
  const browserName = userAgentInfo.browser.name
  const osName = userAgentInfo.os.name
  if(!fs.existsSync('./screenshots')){
    fs.mkdirSync('./screenshots',{recursive: true})
  }
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
  await screenshot({filename: `./screenshots/${test.info().title.split('[')[1].split(']')[0]}.png`})
})

test('[14] Verify Title', async ({ page }) => {
  await test.step('[1] Navigate to website', async () => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })
  await test.step('[2] Assert the title of webpage', async () => {
    await expect(page).toHaveTitle('OrangeHRM')
    await expect(page.locator('xpath=//input[@name="username"]')).toBeVisible()
  })
})

test('[15] Login', async ({ page }) => {
  await test.step('[1] Navigate to website', async () => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })
  await test.step('[2] Enter username and password', async () => {
    await page.locator('xpath=//input[@name="username"]').fill('Admin')
    await page.locator('xpath=//input[@name="password"]').fill('admin123')
  })
  await test.step('[3] Click on login button', async () => {
    await page.locator('xpath=//button[@type="submit"]').click()
  })
  await test.step('[4] Assert element is visible', async () => {
    await expect(page.locator('xpath=//span[@class="oxd-topbar-header-breadcrumb"]')).toBeVisible()
  })
})
