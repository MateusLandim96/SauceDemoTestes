import { expect, test } from '../src/fixtures/test';
import { products } from '../src/data/products';

test.describe('Smoke da loja @smoke', () => {
  test('carrega a home e permite navegar ao catálogo', async ({ homePage, catalogPage }) => {
    await homePage.goto();
    await homePage.expectLoaded();

    await homePage.header.openCatalog();

    await expect(catalogPage.title).toBeVisible();
    await catalogPage.expectProduct(products.greyJacket.name, products.greyJacket.price);
  });

  test('exibe os detalhes de um produto', async ({ productPage }) => {
    await productPage.goto(products.greyJacket.path);

    await productPage.expectProduct(products.greyJacket.name, products.greyJacket.price);
    await expect(productPage.addToCartButton).toBeEnabled();
  });
});
