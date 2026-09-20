import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
  readonly title: Locator;
  readonly price: Locator;
  readonly quantity: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByRole('heading', { level: 1 }).filter({ hasNot: page.getByRole('link') }).first();
    this.price = page.getByRole('heading', { level: 2, name: /^£\d+\.\d{2}$/ }).first();
    this.quantity = page.locator('input[name="quantity"]');
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
  }

  async goto(path: string): Promise<void> {
    await this.open(path);
  }

  async expectProduct(name: string, price: string): Promise<void> {
    await expect(this.title).toHaveText(name);
    await expect(this.price).toHaveText(price);
  }

  async addToCart(amount = 1): Promise<void> {
    if (await this.quantity.count()) {
      await this.quantity.fill(String(amount));
    }
    const [response] = await Promise.all([
      this.page.waitForResponse(
        response => response.url().includes('/cart/add') && response.ok()
      ),
      this.addToCartButton.click()
    ]);
    await response.finished();
    await expect.poll(async () =>
      this.page.evaluate(async () => {
        const cart = await fetch('/cart.js').then(result => result.json()) as { item_count: number };
        return cart.item_count;
      })
    ).toBeGreaterThanOrEqual(amount);
  }
}
