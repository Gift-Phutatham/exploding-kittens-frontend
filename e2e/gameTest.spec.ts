import { test, expect } from '@playwright/test';
import CreateRoomPage from './joinRoom';
import GameElement from './gameElement';
import { makeid } from './utils';
import ChatTest from './chatTest';

test('home page has correct title, and clickable "Create Room / Join Room" button', async ({
  page,
}) => {
  await page.goto('/');

  // Check the page title
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Exploding Kittens');

  // Click the "Create / Join Room" button
  const createJoinRoomButton = page.locator('.button');
  await expect(createJoinRoomButton).toBeVisible();
  await createJoinRoomButton.click();
});

test('game room has correct title, "Game Room" text, and input fields', async ({ page }) => {
  // Navigate to the GameRoom page using the relative path
  await page.goto('/GameRoom');

  // Check the page title
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Exploding Kittens');

  // Check the "Game Room" text within the specified div
  const gameRoomText = await page.textContent('div.title-style');
  expect(gameRoomText).toBe('Create Room');

  // Check visibility of the "Name" and "Room ID" input fields
  await expect(page.locator('input#input-0')).toBeVisible();
  await expect(page.locator('input#input-2')).toBeVisible();

  // Fill in the "Name" and "Room ID" input fields
  await page.fill('input#input-0', 'Your Name');
  await page.fill('input#input-2', '1234');

  // Click on the "Select Character" div
  await page.click('div.card-title-style:has-text("Select Character")');

  // Check visibility of the character images
  await expect(page.locator('.v-row:nth-of-type(1) > .v-col-6:nth-of-type(1) img')).toBeVisible();
  await expect(page.locator('.v-row:nth-of-type(1) > .v-col-6:nth-of-type(2) img')).toBeVisible();
  await expect(page.locator('.v-row:nth-of-type(2) > .v-col-6:nth-of-type(1) img')).toBeVisible();
  await expect(page.locator('.v-row:nth-of-type(2) > .v-col-6:nth-of-type(2) img')).toBeVisible();

  // Click on the character images
  await page.click('.v-row:nth-of-type(1) > .v-col-6:nth-of-type(1) img');
  await page.click('.v-row:nth-of-type(1) > .v-col-6:nth-of-type(2) img');
  await page.click('.v-row:nth-of-type(2) > .v-col-6:nth-of-type(1) img');
  await page.click('.v-row:nth-of-type(2) > .v-col-6:nth-of-type(2) img');

  // Check visibility of the "Create" button
  await expect(page.locator('button:has-text("Create")')).toBeVisible();

  // Click on the "Create" button
  await page.click('button:has-text("Create")');
});

test('join game dialog appears with correct text after clicking "Create" button', async ({
  page,
}) => {
  // Navigate to the GameRoom page using the relative path
  await page.goto('/GameRoom');

  // Fill in the "Name" and "Room ID" input fields
  await page.fill('input#input-0', 'Your Name');
  await page.fill('input#input-2', '1234');

  // Click on the "Select Character" div
  await page.click('div.card-title-style:has-text("Select Character")');

  // Click on any character image
  await page.click('.v-row:nth-of-type(1) > .v-col-6:nth-of-type(1) img');

  // Click on the "Create" button
  await page.click('button:has-text("Create")');

  // Wait for the dialog to appear and check for the "Waiting for others to join ..." text
  await page.waitForSelector('div.v-dialog:visible');
  const waitingText = await page.textContent('div.v-dialog:visible');
  expect(waitingText).toContain('Waiting for others to join ...');
});

test('4 players join the game with different names and same room id and see game elements', async ({
  page,
  context,
}) => {
  // Navigate to the GameRoom page using the relative path
  const game = new CreateRoomPage(page);
  const gameElement = new GameElement(page);
  const chatTest = new ChatTest(page);
  await page.goto('/GameRoom');
  const roomId = makeid(4);

  // Player 1 joins the game
  await game.joinGame('Player1', roomId, page);

  // Player 2 joins the game in a new context
  const page2 = await context.newPage();
  await page2.goto('/GameRoom');
  await game.joinGame('Player2', roomId, page2);

  // Player 3 joins the game in a new context
  const page3 = await context.newPage();
  await page3.goto('/GameRoom');
  await game.joinGame('Player3', roomId, page3);

  // Player 4 joins the game in a new context
  const page4 = await context.newPage();
  await page4.goto('/GameRoom');
  await game.joinGame('Player4', roomId, page4);

  // Wait for the "Create" button to appear in the dialog for Player 4
  await page4.waitForSelector('button:has-text("Create"):visible');

  // Player 4 clicks the "Create" button
  await page4.click('button:has-text("Start")');

  const pages = [page, page2, page3, page4];
  for (const eachPage of pages) {
    const gameElements = await gameElement.checkGameElements(eachPage);

    expect(gameElements[0]).toBe(3);
    expect(gameElements[1]).toBeTruthy();
    expect(gameElements[2]).toBeTruthy();
    expect(gameElements[3].length).toBe(2); // one for chat box, one for game log box
    expect(gameElements[4]).toBeVisible();
    expect(gameElements[5]).toBeVisible();
    expect(gameElements[6]).toBeVisible();

    const playerElements = await gameElement.checkPlayerElements(eachPage);

    expect(playerElements[0]).toContain('Timer:');
    expect(playerElements[1]).toContain('Nope Timer:');

    const buttonElements = await gameElement.checkButtonsVisibilityAndHomePageClick(eachPage);

    expect(buttonElements[0]).toBeVisible();
    expect(buttonElements[1]).toBeVisible();
    expect(buttonElements[2]).toBeVisible();
    expect(buttonElements[3]).toBeVisible();
    expect(buttonElements[4]).toBeVisible();

    await chatTest.testChatFunctionality(eachPage);
    await buttonElements[4].click();
  }
});

test('visits the 404 root url', async ({ page }) => {
  await page.goto('/404');
  await expect(page.getByText('404')).toBeVisible();
});
