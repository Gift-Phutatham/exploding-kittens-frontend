import type { Page } from '@playwright/test';
export default class ChatTest {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async testChatFunctionality(page: any) {
    // Locate the chat input element
    const chatInput = await page.locator('.v-field__input');

    // Type a message in the chat input element
    await chatInput.type('Hello, this is a test message!');

    // Locate the send button
    const sendButton = await page.locator('i[aria-label="Message appended action"]');

    // Click the send button
    await sendButton.click();
  }
}
