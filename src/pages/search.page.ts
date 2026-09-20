import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class SearchPage extends BasePage {
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByRole('heading', { name: 'Search Results', exact: true });
  }

  result(name: string): Locator {
    return this.page.getByRole('link', { name: new RegExp(name, 'i') }).first();
  }

  async expectResult(name: string): Promise<void> {
    await expect(this.title).toBeVisible();
    await expect(this.result(name)).toBeVisible();
  }
}
