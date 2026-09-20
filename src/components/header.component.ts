import { type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  readonly catalogLink: Locator;
  readonly loginLink: Locator;
  readonly cartLink: Locator;
  readonly searchInput: Locator;
  readonly menuLink: Locator;

  constructor(private readonly page: Page) {
    this.catalogLink = page.getByRole('link', { name: 'Catalog', exact: true });
    this.loginLink = page.getByRole('link', { name: /log in/i }).first();
    this.cartLink = page.getByRole('link', { name: /my cart/i }).first();
    this.searchInput = page.getByRole('textbox', { name: 'Search', exact: true }).first();
    this.menuLink = page.getByRole('link', { name: 'Menu', exact: true });
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openCatalog(): Promise<void> {
    if (!(await this.catalogLink.isVisible())) {
      await this.menuLink.click();
    }
    await this.catalogLink.click();
  }
}
