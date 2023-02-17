import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{
  await page.goto('https://www.google.com/');
})

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle('Google');
  // await page.evaluate(() => {
  //   const div = document.createElement('div');
  //   div.textContent = new Date().toDateString();
  //   div.setAttribute('style', 'position: fixed; top: 0; left: 0;');
  //   document.body.appendChild(div);
  // });
  // await page.screenshot({path: 'screenshot.png'})
});

test('get started link', async ({ page }) => {
  await page.locator('xpath=//input[@name="q"]').fill('playwright')
  await page.keyboard.press('Enter')
  await expect(page).toHaveTitle('playwright - Google Search');
});
