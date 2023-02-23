import { test, expect } from '../fixtures/screenshotAutoFixture'

test('[14] Verify Title', async ({ page }) => {
  await test.step('[1] Navigate to website', async () => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })
  await test.step('[2] Assert the title of webpage', async () => {
    await expect(page).toHaveTitle('OrangeHR')
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
