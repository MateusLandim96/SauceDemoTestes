import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly title: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByRole('heading', { name: 'Customer Login', exact: true });
    this.email = page.getByLabel(/email address/i);
    this.password = page.getByLabel(/^password$/i);
    this.submitButton = page.getByRole('button', { name: /sign in|login/i });
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot your password/i });
  }

  async goto(): Promise<void> {
    await this.open('/account/login');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toBeVisible();
    await expect(this.email).toBeEditable();
    await expect(this.password).toBeEditable();
    await expect(this.forgotPasswordLink).toBeVisible();
  }
}
