import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the home page root url', async ({ page }) => {
  await page.goto('/');
  await page.locator('button').click({ force: true });
});

test('visits the game room root url', async ({ page }) => {
  await page.goto('/GameRoom');
  await expect(page.locator('h1')).toHaveText('Game Room');
});

test('visits the create room root url', async ({ page }) => {
  await page.goto('/CreateRoom');
  await expect(page.locator('h1')).toHaveText('Create Room');
});

test('visits the 404 root url', async ({ page }) => {
  await page.goto('/404');
  await expect(page.locator('h1')).toHaveText('404');
});
