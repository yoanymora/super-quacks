import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { LOGIN_URL, USER_CREDENTIALS } from '../data/Constants';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('3 - should be able to login correctly', async ({ page }) => {

  const loginPage = new LoginPage(page);

 await loginPage.goto(LOGIN_URL);
 await loginPage.login(USER_CREDENTIALS.STANDARD_USER, USER_CREDENTIALS.PASSWORD);  
 await expect(page.getByRole('link', { name: 'Today' })).toBeVisible();
});
