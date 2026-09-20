import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { CatalogPage } from '../pages/catalog.page';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { SearchPage } from '../pages/search.page';

type AppFixtures = {
  homePage: HomePage;
  catalogPage: CatalogPage;
  productPage: ProductPage;
  cartPage: CartPage;
  searchPage: SearchPage;
  loginPage: LoginPage;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  catalogPage: async ({ page }, use) => use(new CatalogPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  searchPage: async ({ page }, use) => use(new SearchPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page))
});

export { expect } from '@playwright/test';
