import { test, expect } from '@playwright/test';
import UAParser from 'ua-parser-js';

test.afterEach(async ({ page }) => {
  const getUA = await page.evaluate(() => navigator.userAgent);
  const userAgentInfo = UAParser(getUA);
  const browserName = userAgentInfo.browser.name;
  const osName = userAgentInfo.os.name;
  await page.evaluate(
    async ({ browserName, osName }) => {
      const div = document.createElement('div');
      div.innerHTML = `${new Date().toLocaleString()} <br /> ${
        browserName as string
      } <br /> ${osName as string}`;
      div.setAttribute(
        'style',
        'position: fixed; top: 0; left: 0;font-size:160%;',
      );
      document.body.appendChild(div);
    },
    { browserName, osName },
  );
});

test('[14] Verify Title', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle('Google');
});

test('[15] Verify Title after search', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.locator('xpath=//input[@name="q"]').fill('playwright');
  await page.keyboard.press('Enter');
  await expect(page).toHaveTitle('playwright - Google Search');
});
