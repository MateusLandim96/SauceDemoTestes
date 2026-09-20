import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly emptyMessage: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByRole('heading', { name: 'My Cart', exact: true });
    this.emptyMessage = page.getByText(/cart is currently empty/i);
    this.checkoutButton = page.getByRole('button', { name: /check out|checkout/i });
  }

  async goto(): Promise<void> {
    await this.open('/cart');
  }

  productRow(name: string): Locator {
    return this.page.getByRole('heading', {
      level: 3,
      name: new RegExp(name, 'i')
    }).first();
  }

  async expectEmpty(): Promise<void> {
    await expect(this.title).toBeVisible();
    await expect(this.emptyMessage).toBeVisible();
  }

  async expectProduct(name: string, price: string): Promise<void> {
    const row = this.productRow(name);
    await expect(row).toBeVisible();
    await expect(
      this.page.getByText(price, { exact: true }).filter({ visible: true }).first()
    ).toBeVisible();
  }
}
