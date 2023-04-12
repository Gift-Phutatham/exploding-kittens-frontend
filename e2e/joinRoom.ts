import type { Page } from '@playwright/test';

export default class CreateRoomPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async joinGame(playerName: string, roomId: string, page: Page) {
    await page.fill('input#input-0', playerName);
    await page.fill('input#input-2', roomId);

    await page.click('div.card-title-style:has-text("Select Character")');

    // Click on any character image
    await page.click('.v-row:nth-of-type(1) > .v-col-6:nth-of-type(1) img');

    // Click on the "Create" button
    await page.click('button:has-text("Create")');
  }
}
