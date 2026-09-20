import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CatalogPage extends BasePage {
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByRole('heading', { name: 'Products', exact: true });
  }

  async goto(): Promise<void> {
    await this.open('/collections/all');
  }

  product(name: string): Locator {
    return this.page.getByRole('link', { name: new RegExp(name, 'i') }).first();
  }

  async expectProduct(name: string, price: string): Promise<void> {
    const product = this.product(name);
    await expect(product).toBeVisible();
    await expect(product).toContainText(price);
  }

  async openProduct(name: string): Promise<void> {
    await this.product(name).click();
  }
}
