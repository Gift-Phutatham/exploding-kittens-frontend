import type { Page } from '@playwright/test';

export default class GameElement {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkPlayerElements(page: any) {
    const result = [];
    // Wait for the presence of the timer element
    await page.waitForSelector('.v-col.timer');

    // Check for Timer text
    const timerText = await page.textContent('.v-col.timer .font-weight-bold:nth-child(1)');
    result.push(timerText);

    // Check for Nope Time text
    const nopeTimeText = await page.textContent('.v-col.timer p:nth-child(2) .font-weight-bold');
    result.push(nopeTimeText);
    return result;
  }

  async checkGameElements(page: any): Promise<any> {
    const result = [];
    // Check for the presence of player display
    // Check for Player display
    await page.waitForSelector('.player-card');
    const playerCards = await page.$$('.player-card');
    result.push(playerCards.length);

    // Check for the presence of deck
    await page.waitForSelector('.v-card--variant-elevated');
    const deck = await page.$('.v-card--variant-elevated');
    result.push(deck);

    // Check for the presence of chat box
    await page.waitForSelector('.chat-banner');
    const chatBox = await page.$('.chat-banner');
    result.push(chatBox);

    // Check for the presence of game log box
    await page.waitForSelector('.v-banner');
    const gameLogBox = await page.$$('.v-banner');
    result.push(gameLogBox);

    const chatBoxBanner = await page.locator('.chat-banner:has-text("Chat Box")');
    result.push(chatBoxBanner);

    // Check for Game Log visibility
    const gameLogBanner = await page.locator('.chat-banner:has-text("Game Log")');
    result.push(gameLogBanner);

    const gameLog = await page.locator(
      '.v-card:has(.chat-banner:has-text("Game Log")) .v-card-item',
    );
    result.push(gameLog);

    return result;
  }

  async checkButtonsVisibilityAndHomePageClick(page: any) {
    const result = [];
    // Check for End Turn button visibility
    const endTurnButton = await page.locator('button:has-text("End Turn")');
    result.push(endTurnButton);

    // Check for Play 2 of a Kind button visibility
    const play2OfAKindButton = await page.locator('button:has-text("Play 2 of a Kind")');
    result.push(play2OfAKindButton);

    // Check for Play button visibility
    const playButton = await page.locator(
      'button:has-text("Play"):not(:has-text("Play 2 of a Kind")):not(:has-text("Play Nope"))',
    );
    result.push(playButton);

    // Check for Play Nope button visibility
    const playNopeButton = await page.locator('button:has-text("Play Nope")');
    result.push(playNopeButton);

    // Check for Home Page button visibility and click
    const homePageButton = await page.locator('a:has-text("Home Page")');
    result.push(homePageButton);

    return result;
  }
}
