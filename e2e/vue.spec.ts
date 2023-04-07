import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the home page root url', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Create / Join Room' }).click();
});

test('visits the game room root url', async ({ page }) => {
  await page.goto('/GameRoom');
  await expect(page.getByText('Game Room')).toBeVisible();
});

test('visits the create room root url', async ({ page }) => {
  await page.goto('/CreateRoom');
});

test('visits the 404 root url', async ({ page }) => {
  await page.goto('/404');
  await expect(page.getByText('404')).toBeVisible();
});
