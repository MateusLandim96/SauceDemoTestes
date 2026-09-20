import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly header: HeaderComponent;
  readonly tagline: Locator;
  readonly featuredProducts: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.tagline = page.getByRole('heading', {
      name: 'Just a demo site showing off what Sauce can do.'
    });
    this.featuredProducts = page.getByRole('heading', { level: 3 });
  }

  async goto(): Promise<void> {
    await this.open('/');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.featuredProducts.first()).toBeVisible();
  }
}
